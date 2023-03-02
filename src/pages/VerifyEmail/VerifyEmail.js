import React from 'react'
import { Container, Box, Grid, Typography, Paper, Button } from '@mui/material'
import * as Yup from 'yup'

import usePageTitle from 'hooks/use-page-title'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const VerifyEmail = ({ title, text }) => {
  usePageTitle('Login | SourceOn')

  const handleSubmit = () => {}

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
                <Typography variant="body2">
                  Please enter the email address you used to sign up
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
                <Button variant="contained" onClick={submit}>
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default VerifyEmail
