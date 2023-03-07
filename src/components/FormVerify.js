import React, { useState } from 'react'
import * as Yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Grid, Typography, Divider } from '@mui/material'
import firebase from 'config/firebase'
import { Send } from '@mui/icons-material'

import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'assets/images/google_logo.svg'
import usePageTitle from 'hooks/use-page-title'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { LoadingButton } from '@mui/lab'

const { REACT_APP_PUBLIC_URL } = process.env

const FormSignIn = ({ onSubmit, redirectUrl }) => {
  const [googleSignInIsLoading, setGoogleSignInIsLoading] = useState(false)
  const [emailSignInIsLoading, setEmailSignInIsLoading] = useState(false)
  // const [showEmailWasSent, setShowEmailWasSent] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/'

  const { setError, clearError } = useAlertStore()

  var provider = new firebase.auth.GoogleAuthProvider()

  const handleSignInWithGoogle = async () => {
    setGoogleSignInIsLoading(true)
    clearError()
    try {
      !!onSubmit && (await onSubmit({ method: 'google' }))
      await firebase.auth().signInWithPopup(provider)

      navigate(redirectUrl || from || '/', from && { replace: true })
    } catch (err) {
      setGoogleSignInIsLoading(false)
      setError({ message: 'An error occurred. Please try again.' })
    }
  }

  const handleVerifyWithEmailLink = async ({ email }) => {
    setEmailSignInIsLoading(true)
    clearError()
    try {
      !!onSubmit && (await onSubmit({ method: 'email' }))
      await firebase.auth().sendSignInLinkToEmail(email, {
        url: REACT_APP_PUBLIC_URL + (redirectUrl || ''),
        handleCodeInApp: true,
      })
    } catch (err) {
      setEmailSignInIsLoading(false)
      setError({ message: 'An error occurred. Please try again.' })
    }
  }

  usePageTitle('Login | SourceOn')

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

  const { submit, control } = useFormHelper({
    onSubmit: handleSignUpWithEmailLink,
    formFields,
  })

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <LoadingButton
          type="button"
          variant="outlined"
          size="large"
          // color="secondary"
          fullWidth
          sx={{
            height: '51.5px',
            textTransform: 'none',
            // backgroundColor: '#ffffff',
            // '&:hover': {
            //   backgroundColor: '#ffffff',
            // },
            letterSpacing: '0.5px',
          }}
          onClick={handleSignInWithGoogle}
          loading={googleSignInIsLoading}
        >
          <Box display="flex" mr="20px">
            <img
              src={GoogleLogo}
              alt="Google Logo"
              style={{ height: '24px', width: '24px' }}
            />
          </Box>
          Sign in with Google
        </LoadingButton>
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
          loading={emailSignInIsLoading}
        >
          Send Me a Link
        </LoadingButton>
      </Grid>

      {/* {showEmailWasSent && (
        <>
          <Grid item xs={12}>
            <Typography variant="body1">
              We've sent you an email with a link to sign in. Please check your
              inbox to continue.
            </Typography>
          </Grid>
        </>
      )} */}
    </Grid>
  )
}

export default FormSignIn
