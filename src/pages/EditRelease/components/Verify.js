import React from 'react'
import { Grid, Typography } from '@mui/material'
import FormSignIn from 'components/FormSignIn'
import Emoji from 'components/Emoji'

const Verify = ({ id }) => {
  const redirectUrl = '/releases/' + id

  const email = window.localStorage.getItem('email')

  return (
    <Grid container justifyContent="flex-start" spacing={3} maxWidth="500px">
      <Grid item xs={12}>
        <Typography variant="h4">
          <b>We're ready to generate your release!</b>
        </Typography>
      </Grid>
      <Grid item xs={12} mb={1}>
        <Typography>
          We just need you to verify your email to make sure you're not a bot.
          There can only be one bot, and that's us{' '}
          <Emoji symbol="🤖" label="robot" />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormSignIn redirectUrl={redirectUrl} email={email} />
      </Grid>
    </Grid>
  )
}

export default Verify
