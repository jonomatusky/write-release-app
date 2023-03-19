import React, { useState } from 'react'
import { Container, Box, Grid, Typography, Paper } from '@mui/material'
import * as Yup from 'yup'

import firebase from 'config/firebase'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useAlertStore from 'hooks/store/use-alert-store'
import { LoadingButton } from '@mui/lab'
import { useSearchParams } from 'react-router-dom'

const VerifyEmail = ({ component: ReactComponent }) => {
  const isEmailLink = firebase
    .auth()
    .isSignInWithEmailLink(window.location.href)

  const [, setSearchParams] = useSearchParams()

  let email = window.localStorage.getItem('email')

  const { setError } = useAlertStore()

  const showPage = isEmailLink && !email

  const [isLoading, setIsLoading] = useState(false)

  const signIn = async email => {
    setIsLoading(true)
    try {
      await firebase.auth().signInWithEmailLink(email, window.location.href)
      setSearchParams({})
    } catch (err) {
      setError({
        message: 'Sorry, something went wrong. Please try signing in instead.',
        // message: (
        //   <span>
        //     Sorry, something went wrong. Try{' '}
        //     <Link href="/login" color="inherit">
        //       signing in
        //     </Link>{' '}
        //     instead.
        //   </span>
        // ),
      })
    }

    window.localStorage.removeItem('email')
    setIsLoading(false)
  }

  const handleSubmit = ({ email }) => {
    try {
      signIn(email)
    } catch (err) {
      setError({ message: 'An error occurred. Please try again.' })
    }
  }

  const formFields = [
    {
      name: 'email',
      label: 'Please enter the email address you used to sign up',
      type: 'email',
      placeholder: 'Enter your email',
      validation: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    },
  ]

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  return (
    <>
      {!showPage && <ReactComponent />}
      {showPage && (
        <Container maxWidth="xs">
          <Box mt={10}>
            <Paper variant="outlined">
              <Box p={4}>
                <Grid container justifyContent="center" spacing={3}>
                  <Grid item xs={12} mt={2}>
                    <Typography variant="h5">
                      <b>Confirm your Email Address</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Form
                      control={control}
                      formFields={formFields}
                      submit={submit}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      variant="contained"
                      onClick={submit}
                      fullWidth
                      loading={isLoading}
                    >
                      Confirm
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
      )}
    </>
  )
}

export default VerifyEmail
