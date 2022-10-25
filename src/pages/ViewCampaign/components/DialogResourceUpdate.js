import React from 'react'
import { Grid, Box } from '@mui/material'
import * as Yup from 'yup'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import useUserStore from 'hooks/store/use-user-store'
import useResourcesStore from 'hooks/store/use-resources-store'
import Form from 'components/Form/Form'

const DialogAddResource = ({ open, onClose, contentId, id }) => {
  const { select: selectContent } = useContentStore()
  const { item: user } = useUserStore()
  const { create, update, select, updateStatus, createStatus } =
    useResourcesStore()

  const resource = !!id ? select(id) : {}
  const content = !!contentId ? selectContent(contentId) : {}

  const setupStage = !!id ? content.setupStage : null
  const isSetup = setupStage === 'about'

  const handleSubmit = async values => {
    values.organizations = content.organizations
    values.individuals = content.individuals
    values.content = contentId
    values.owner = user

    try {
      if (!!id) {
        await update({ id, ...values })
      } else {
        console.log('submitting')
        await create(values)
      }

      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const types = [
    'Website',
    'Notes',
    'Meeting Notes',
    'Transcript',
    'Emails',
    'Q&A',
    'Resume',
    'Product Sheet',
    'One-Pager',
  ]

  const formFields = [
    {
      label: 'Resource Type',
      name: 'type',
      options: types,
      type: 'auto',
      validation: Yup.string().required('Type is required'),
    },
    {
      label: 'Text',
      name: 'text',
      type: 'textarea',
      placeholder: 'Paste text here',
      validation: Yup.string().required('Please paste in your text'),
    },
  ]

  const { control, submit, reset, watch } = useFormHelper({
    formFields,
    initialValues: {
      type: resource.type || 'Notes',
      text: resource.text,
    },
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    reset()
    onClose()
  }

  return (
    <>
      <LayoutDialogEdit
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <NoteAdd /> */}
            <Box>Add Resource</Box>
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
            <Form
              formFields={formFields}
              submit={submit}
              control={control}
              watch={watch}
            />
          </Grid>
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogAddResource
