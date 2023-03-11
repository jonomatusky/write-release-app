import React, { useState } from 'react'
import { Grid, Typography, Link } from '@mui/material'
import FormSignIn from 'components/FormSignIn'
import useContentStore from 'hooks/store/use-content-store'
import { setError } from 'redux/alertSlice'
import GridButtons from './GridButtons'
import Emoji from 'components/Emoji'

const StepVerify = ({ answers, verificationType, onBack, onNext, onAnswer }) => {
  const { create } = useContentStore()
  const [redirectUrl, setRedirectUrl] = useState('/')

  const handleSubmit = async ({method}) => {
    try {
      const content = await create(answers)
      onAnswer({ method })

      setRedirectUrl('/releases/' + content.id)
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
          <b>We're ready to generate you're release</b>
        </Typography>
      </Grid>
      <Grid item xs={12} mb={1}>
        <Typography>
          We just need you to verify your email to make sure you're not a bot. There can only be one bot, and that's us <Emoji symbol="🤖" label="robot" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormSignIn redirectUrl={redirectUrl} onSubmit={handleSubmit} />
      </Grid>
      <Grid item xs={12}>
        <GridButtons onBack={onBack} />
      </Grid>
    </Grid>
  )
}

export default StepVerify
