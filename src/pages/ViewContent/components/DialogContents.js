import React from 'react'
import { Box, Grid } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const DialogContents = ({ open, onClose, id }) => {
  const { items: contents, update, select, updateStatus } = useContentStore()
  const content = select(id)

  const formFields = [
    {
      label: `Add any other pieces of content to reference`,
      name: 'contents',
      options: contents || [],
      type: 'auto-multi',
    },
  ]

  const handleSubmit = async values => {
    const newContent = {
      id,
      ...values,
    }

    try {
      await update(newContent)
      await onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: content,
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    reset()
    onClose()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* <Edit /> */}
          <Box pl={1}>Other Content</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
      label={'Save'}
      cancelLabel={'Cancel'}
    >
      <Box display="flex">
        <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
          <Grid item xs={12}>
            <Form submit={submit} control={control} formFields={formFields} />
          </Grid>
        </Grid>
      </Box>
    </LayoutDialogEdit>
  )
}

export default DialogContents
