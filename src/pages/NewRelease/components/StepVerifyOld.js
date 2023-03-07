import React, { useState } from 'react'
import { Grid, Typography, Link } from '@mui/material'
import FormSignIn from 'components/FormSignIn'
import useContentStore from 'hooks/store/use-content-store'
import { setError } from 'redux/alertSlice'
import GridButtons from './GridButtons'

const StepVerify = ({ answers, verificationType, onBack, onNext, onAnswer }) => {
  const { create } = useContentStore()
  const [redirectUrl, setRedirectUrl] = useState('/')

  const handleSubmit = async ({method}) => {
    try {
      const content = await create(answers)
      onAnswer({ method })

      setRedirectUrl('/releases/edit/' + content.id)
    } catch (error) {
      setError({
        message:
          'Sorry, unable to create your release. Please try again later.',
      })
    }
  }

  return (
    <Grid container justifyContent="flex-start" spacing={3} maxWidth="500px">
      <Grid item xs={12}>
        <Typography variant="h4">
          <b>Great! Now, what's your email?</b>
        </Typography>
      </Grid>
      <Grid item xs={12} mb={1}>
        <Typography>
          We ask users to verify their email address to prevent abuse.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormSignIn redirectUrl={redirectUrl} onSubmit={handleSubmit} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          By signing up, you agree to our{' '}
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
      <Grid item xs={12}>
        <GridButtons onBack={onBack} />
      </Grid>
    </Grid>
  )
}

export default StepVerify
