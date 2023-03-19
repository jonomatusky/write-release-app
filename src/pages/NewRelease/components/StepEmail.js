import React, { useState } from 'react'
import { Grid, Typography, Link } from '@mui/material'
import * as Yup from 'yup'
import GridButtons from './GridButtons'
import useAlertStore from 'hooks/store/use-alert-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const StepEmail = ({ onBack, onNext, onAnswer, answers, onSubmitEmail }) => {
  const { setError, clearError } = useAlertStore()
  const [isLoading, setIsLoading] = useState(false)

  // const handleLoginWithGoogle = async () => {
  //   try {
  //     onAnswer({ verificationType: 'google' })
  //     onNext()
  //   } catch (error) {}
  // }

  const handleSaveEmail = async values => {
    setIsLoading(true)
    clearError()
    try {
      window.localStorage.setItem('email', values.tempUserEmail)
    } catch (err) {}

    onSubmitEmail(values)

    try {
      onAnswer(values)
      onNext()
    } catch (err) {
      console.log(err)
      setError({ message: 'An error occurred. Please try again.' })
    }
    return () => setIsLoading(false)
  }

  const formFields = [
    {
      name: 'tempUserEmail',
      // label: `Enter your email address and we'll send you a link to sign in`,
      type: 'email',
      placeholder: 'Enter your email',
      validation: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email address'),
      autoFocus: true,
    },
  ]

  const { submit, control } = useFormHelper({
    onSubmit: handleSaveEmail,
    initialValues: answers,
    formFields,
  })

  return (
    <Grid container justifyContent="flex-start" spacing={3} maxWidth="500px">
      <Grid item xs={12}>
        <Typography variant="h4">
          <b>Great! Now, what's your email?</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Form submit={submit} control={control} formFields={formFields} />
          </Grid>
          {/* <Grid item xs={12} container alignItems="center" spacing={1}>
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
            <ButtonSignInWithGoogle onSuccess={handleLoginWithGoogle} />
          </Grid> */}

          {/* <Grid item xs={12}>
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
          </Grid> */}

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
      </Grid>
      <Grid item xs={12}>
        <GridButtons onBack={onBack} onNext={submit} loading={isLoading} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          We ask users to verify their email address to prevent abuse. By
          signing up, you agree to our{' '}
          <Link href="/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </Link>
          . We'll occasionally send you account related emails.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default StepEmail
