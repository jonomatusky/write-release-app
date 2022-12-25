import React, { useState } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import * as Yup from 'yup'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useResourcesStore from 'hooks/store/use-resources-store'
import DialogResourceAdd from './DialogResourceAdd'
import ResourceItem from './ResourceItem'

import useFormHelper from 'hooks/use-form-helper'
import useUserStore from 'hooks/store/use-user-store'

const DialogResources = ({ open, onClose, id }) => {
  const {
    update: updateContent,
    updateStatus: updateContentStatus,
    select: selectContent,
  } = useContentStore()
  const { select: selectContentType } = useContentTypesStore()
  const { items: resources, create, createStatus } = useResourcesStore()

  const content = !!id ? selectContent(id) : {}
  const contentType = selectContentType(content.type)

  const setupStage = !!id ? content.setupStage : null
  const isSetup = setupStage === 'resources'

  const handleClose = async () => {
    if (isSetup && !!id) {
      let contentType = selectContentType(content.type)

      await updateContent({
        id,
        setupStage:
          contentType.secondary === 'New Hire' ||
          contentType.secondary === 'Board Appointment'
            ? 'hiring'
            : 'subject',
      })
    }
    onClose()
  }

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleOpen = id => {
    setAddDialogIsOpen(true)
  }

  const { item: user } = useUserStore()

  const handleSubmit = async values => {
    values.organizations = content.organizations
    values.individuals = content.individuals
    values.content = id
    values.owner = user

    try {
      await create(values)
      setAddDialogIsOpen(false)
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
    initialValues: { type: 'Notes' },
    onSubmit: handleSubmit,
  })

  const handleCloseAddDialog = async () => {
    reset()
    setAddDialogIsOpen(false)
  }

  const submitForm = async values => {
    try {
      await submit(values)
      reset({ type: 'Notes' })
    } catch (err) {
      console.log(err)
    }
  }

  const onBack = async () => {
    isSetup &&
      (await updateContent({
        id,
        setupStage: 'hiring',
      }))
    reset()
  }

  return (
    <>
      <DialogResourceAdd
        open={addDialogIsOpen}
        onClose={handleCloseAddDialog}
        control={control}
        submit={submitForm}
        reset={reset}
        watch={watch}
        contentId={id}
        formFields={formFields}
        loading={createStatus === 'loading'}
        onBack={
          isSetup &&
          (contentType.secondary === 'New Hire' ||
            contentType.secondary === 'Board Appointment')
            ? onBack
            : null
        }
      />
      <LayoutDialogEdit
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <NoteAdd /> */}
            <Box>Resources</Box>
          </Box>
        }
        open={open || isSetup}
        onClose={handleClose}
        // onSave={submit}
        loading={updateContentStatus === 'loading'}
        // label={isSetup ? 'Next' : 'Save'}
        cancelLabel={isSetup ? 'Next' : 'Done'}
      >
        <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
          <Grid item xs={12}>
            <Typography>
              Add any key resources below, like meeting notes, emails, or
              transcripts.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleOpen}
              size="large"
            >
              Add Resource +
            </Button>
          </Grid>
          {resources.map(resource => (
            <ResourceItem id={resource.id} key={resource.id} />
          ))}
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogResources
