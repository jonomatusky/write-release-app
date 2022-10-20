import React, { useState } from 'react'
import { Grid, Box } from '@mui/material'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import OrganizationCard from './OrganizationCard'
import DialogCreateEditCompany from 'pages/ViewContent/components/DialogCreateEditCompany'
import useUserStore from 'hooks/store/use-user-store'
import DialogDeleteContent from './DialogDeleteContent'

const DialogAbout = ({ open, onClose, id }) => {
  const {
    create,
    update,
    updateStatus,
    createStatus,
    select: selectContent,
  } = useContentStore()
  const { items: contentTypes, select: selectContentType } =
    useContentTypesStore()
  const { items: organizations, select: selectOrganization } =
    useOrganizationsStore()
  const { item: user } = useUserStore()

  const content = !!id ? selectContent(id) : {}

  const setupStage = !!id ? content.setupStage : null
  const isSetup = setupStage === 'about'

  const handleSubmit = async values => {
    let { organization: organizationId, ...newValues } = values
    let contentType = selectContentType(values.type)

    !id && (newValues.owner = user.id)
    !id && (newValues.organizations = [organizationId])

    let date = values.date ? new Date(values.date) : new Date()

    const organization = selectOrganization(organizationId) || {}

    newValues.titleInternal =
      organization.name +
      ' ' +
      contentType.secondary +
      ' ' +
      contentType.primary +
      ' ' +
      date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

    newValues.setupStage = !isSetup && !!id ? null : 'resources'

    try {
      if (!!id) {
        await update({ id, ...newValues })
      } else {
        const c = await create(newValues)
        window.location.hash = ''
        navigate(`/content/${c.id}`)
      }

      onClose()
    } catch (err) {}
  }

  const formFields = [
    {
      label: 'When is this release going out?',
      name: 'date',
      type: 'date',
    },
    {
      label: 'What type of press are you writing?',
      name: 'type',
      options:
        contentTypes.map(contentType => ({
          ...contentType,
          name: contentType.secondary,
        })) || [],
      type: 'auto',
      validation: Yup.string().required('Type is required'),
      disabled: !!id,
    },
    {
      label: 'Which company is this for?',
      name: 'organization',
      options: organizations || [],
      type: 'auto',
      validation: Yup.string().required('Company is required'),
      disabled: !!id,
      AddDialog: DialogCreateEditCompany,
    },
  ]

  const { control, submit, reset, watch } = useFormHelper({
    formFields,
    initialValues: {
      date: content.date,
      type: content.type,
      organization: content.organizations?.[0],
    },
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    if (isSetup && !!id) {
      await update({
        id,
        setupStage: 'resources',
      })
    }
    reset()
    onClose()
  }

  const orgId = watch('organization')

  const navigate = useNavigate()

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)

  return (
    <>
      <DialogDeleteContent
        id={id}
        open={deleteDialogIsOpen}
        onClose={() => setDeleteDialogIsOpen(false)}
      />
      <LayoutDialogEdit
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <NoteAdd /> */}
            <Box>About</Box>
          </Box>
        }
        open={open || isSetup}
        onClose={handleClose}
        onSave={submit}
        onRemove={!!id ? () => setDeleteDialogIsOpen(true) : null}
        loading={updateStatus === 'loading' || createStatus === 'loading'}
        label={isSetup ? 'Next' : 'Save'}
        cancelLabel={isSetup ? 'Skip' : 'Cancel'}
      >
        <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
          <Grid item xs={12}>
            <Form formFields={formFields} submit={submit} control={control} />
          </Grid>
          {!!orgId && (
            <Grid item xs={12}>
              <OrganizationCard id={orgId} />
            </Grid>
          )}
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogAbout
