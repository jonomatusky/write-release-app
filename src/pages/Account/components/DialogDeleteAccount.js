import React from 'react'
import * as Yup from 'yup'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material'

import useUserStore from 'hooks/store/use-user-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const DialogDeleteAcccount = ({ open, onClose }) => {
  const { remove } = useUserStore()

  const handleSubmit = async values => {
    try {
      await remove()
    } catch (err) {}
    onClose()
  }

  const formFields = [
    {
      name: 'field',
      type: 'text',
      placeholder: 'DELETE',
      validation: Yup.string()
        .oneOf(['DELETE'], 'Please type DELETE to confirm')
        .required('Required'),
    },
  ]

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Your Account?</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogContentText>
              This action cannot be undone. Please type DELETE to confirm.
            </DialogContentText>
          </Grid>
          <Grid item xs={12}>
            <Form control={control} formFields={formFields} submit={submit} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={submit}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteAcccount
