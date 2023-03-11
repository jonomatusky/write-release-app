import React, { useState } from 'react'
import * as Yup from 'yup'
import { Grid, Typography, Divider, Button } from '@mui/material'
import firebase from 'config/firebase'
import { Send } from '@mui/icons-material'

import useAlertStore from 'hooks/store/use-alert-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { LoadingButton } from '@mui/lab'
import ButtonSignInWithGoogle from './ButtonSignInWithGoogle'

const { REACT_APP_PUBLIC_URL } = process.env

const FormSignIn = ({ onSubmit, email, redirectUrl, onSuccess }) => {
  const [emailSignInStatus, setEmailSignInStatus] = useState('idle')

  const { setError, clearError } = useAlertStore()

  const handleSignUpWithEmailLink = async ({ email }) => {
    setEmailSignInStatus('loading')
    clearError()
    try {
      !!onSubmit && (await onSubmit({ method: 'email' }))
      await firebase.auth().sendSignInLinkToEmail(email, {
        url: REACT_APP_PUBLIC_URL + (redirectUrl || ''),
        handleCodeInApp: true,
      })
      window.localStorage.setItem('email', email)
      !!onSuccess && (await onSuccess())
      setEmailSignInStatus('success')
    } catch (err) {
      setEmailSignInStatus('idle')
      setError({ message: 'An error occurred. Please try again.' })
    }
  }

  const formFields = [
    {
      name: 'email',
      // label: `Enter your email address and we'll send you a link to sign in`,
      type: 'email',
      placeholder: 'Enter your email',
      validation: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email address'),
    },
  ]

  const initialValues = {
    email: email || '',
  }

  const { submit, control } = useFormHelper({
    onSubmit: handleSignUpWithEmailLink,
    formFields,
    initialValues,
  })

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ButtonSignInWithGoogle redirectUrl={redirectUrl} />
      </Grid>
      <Grid item xs={12} container alignItems="center" spacing={1}>
        <Grid item xs>
          <Divider color="#999999" />
        </Grid>
        <Grid item>
          <Typography color="#999999" variant="body2">
            or
          </Typography>
        </Grid>
        <Grid item xs>
          <Divider color="#999999" />
        </Grid>
      </Grid>
      {emailSignInStatus !== 'success' && (
        <>
          <Grid item xs={12}>
            <Form submit={submit} control={control} formFields={formFields} />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              variant="contained"
              size="large"
              fullWidth
              onClick={submit}
              sx={{
                height: '51.5px',
                textTransform: 'none',
                letterSpacing: '0.5px',
              }}
              endIcon={<Send />}
              loading={emailSignInStatus === 'loading'}
            >
              Send Me a Link
            </LoadingButton>
          </Grid>
        </>
      )}
      {emailSignInStatus === 'success' && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">
              <b>Check your email!</b>
            </Typography>
            <Typography variant="body1">
              We sent you a link to sign in. If you don't see it, check your
              spam folder.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => setEmailSignInStatus('idle')}>
              Send Again
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default FormSignIn
