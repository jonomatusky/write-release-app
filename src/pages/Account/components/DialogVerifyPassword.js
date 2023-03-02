import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material'

import firebase from 'config/firebase'
import useAlertStore from 'hooks/store/use-alert-store'

const validationSchema = Yup.object({
  email: Yup.string(),
})

const DialogVerifyPassword = ({ user, email, onError, open, onClose }) => {
  const { setError, setMessage } = useAlertStore()

  const handleSubmit = async values => {
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        values.password
      )
      await user.reauthenticateWithCredential(credential)
      await user.updateEmail(email)
      setMessage({ message: 'Email successfully updated' })
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/email-already-in-use') {
        setError({ message: `Another account is using ${email}` })
      } else {
        setError({ message: 'An error occurred. Please try again.' })
      }
      onError()
    }
    onClose()
  }

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle>Confirm Password</DialogTitle> */}
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please confirm your password to update your email address.
          </DialogContentText>
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            label="Current Password"
            placeholder="Enter Password"
            {...formik.getFieldProps('password')}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClose={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="medium">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogVerifyPassword
