import React from 'react'
import { Grid, Box } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'

import Form from 'components/Form/Form'

const DialogAddResource = ({
  open,
  onClose,
  control,
  submit,
  watch,
  formFields,
  loading,
}) => {
  return (
    <>
      <LayoutDialogEdit
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <NoteAdd /> */}
            <Box>Add Resource</Box>
          </Box>
        }
        open={open}
        onClose={onClose}
        onSave={submit}
        loading={loading}
        label="Save"
        cancelLabel="Cancel"
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
