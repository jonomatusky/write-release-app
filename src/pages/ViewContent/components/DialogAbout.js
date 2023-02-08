import React from 'react'
import { Grid, Box } from '@mui/material'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import DialogCreateEditCompany from 'pages/ViewStory/components/DialogCreateEditCompany'
import useUserStore from 'hooks/store/use-user-store'

const DialogContentCreate = ({ open, onClose, id }) => {
  const {
    create,
    update,
    updateStatus,
    createStatus,
    select: selectContent,
  } = useContentStore()
  const { items: organizations } = useOrganizationsStore()
  const { item: user } = useUserStore()

  const content = !!id ? selectContent(id) : {}

  const setupStage = !!id ? content.setupStage : null
  const isSetup = setupStage === 'about'

  const handleSubmit = async values => {
    try {
      if (!!id) {
        await update({ id, ...values })
      } else {
        const c = await create({ ...values, owner: user.id })
        window.location.hash = ''
        navigate(`/content/${c.id}`)
      }

      onClose()
    } catch (err) {}
  }

  const formFields = [
    {
      label: `Give it a name (internal use only)`,
      name: 'titleInternal',
      validation: Yup.string().required('Type is required'),
    },
    {
      label: 'Which client is this for?',
      name: 'organization',
      options: organizations || [],
      type: 'auto',
      AddDialog: DialogCreateEditCompany,
    },
  ]

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: {
      titleInternal: content.titleInternal,
      organization: content.organizations?.[0],
    },
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    if (isSetup && !!id) {
      await update({
        id,
      })
    }
    reset()
    onClose()
  }

  const navigate = useNavigate()

  return (
    <>
      <LayoutDialogEdit
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <NoteAdd /> */}
            <Box>{!!id ? 'Basics' : 'Create New'}</Box>
          </Box>
        }
        open={open || isSetup}
        onClose={handleClose}
        onSave={submit}
        loading={updateStatus === 'loading' || createStatus === 'loading'}
        label={isSetup ? 'Next' : 'Save'}
        cancelLabel={isSetup ? 'Skip' : 'Cancel'}
      >
        <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
          <Grid item xs={12}>
            <Form formFields={formFields} submit={submit} control={control} />
          </Grid>
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogContentCreate
