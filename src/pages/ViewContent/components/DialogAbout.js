import React from 'react'
import { Grid, Box } from '@mui/material'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import OrganizationCard from 'pages/ViewCompanies/components/OrganizationCard'

const DialogAbout = ({ open, onClose, id }) => {
  const { update, updateStatus, select: selectContent } = useContentStore()
  const { items: contentTypes, select: selectContentType } =
    useContentTypesStore()
  const { items: organizations, select: selectOrganization } =
    useOrganizationsStore()

  const content = selectContent(id)
  const organization = selectOrganization(content.organizations[0])
  const contentType = selectContentType(content.type)

  const { setupStage } = content
  const isSetup = setupStage === 'about'

  const handleSubmit = async values => {
    console.log(values)
    let date = values.date ? new Date(values.date) : new Date()

    values.titleInternal =
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

    values.setupStage = !isSetup
      ? null
      : contentType.secondary === 'New Hire' ||
        contentType.secondary === 'Board Appointment'
      ? 'hiring'
      : 'subject'

    try {
      await update({ id, ...values })
      onClose()
    } catch (err) {}
    console.log(values)
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
      disabled: true,
    },
    {
      label: 'Which company is this for?',
      name: 'organization',
      options: organizations || [],
      type: 'auto',
      validation: Yup.string().required('Company is required'),
      disabled: true,
    },
  ]

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: {
      type: content.type,
      organization: content.organizations[0],
      date: content.date,
    },
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    isSetup &&
      (await update({
        id,
        setupStage:
          contentType.secondary === 'New Hire' ||
          contentType.secondary === 'Board Appointment'
            ? 'hiring'
            : 'subject',
      }))
    reset()
    onClose()
  }

  const navigate = useNavigate()

  const handleRemove = async () => {
    try {
      update({ id, isRemoved: true })
      navigate('/content')
    } catch (err) {
      console.log(err)
    }
  }

  return (
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
      onRemove={handleRemove}
      loading={updateStatus === 'loading'}
      label={isSetup ? 'Next' : 'Save'}
      cancelLabel={isSetup ? 'Skip' : 'Cancel'}
    >
      <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
        <Grid item xs={12}>
          <Form formFields={formFields} submit={submit} control={control} />
        </Grid>
        <Grid item xs={12}>
          <OrganizationCard id={organization.id} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogAbout
