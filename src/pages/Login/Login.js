import React from 'react'
import { Container, Box, Grid, Typography, Paper } from '@mui/material'
import usePageTitle from 'hooks/use-page-title'
import FormSignIn from 'components/FormSignIn'

const Login = ({ title, text }) => {
  usePageTitle('Login | SourceOn')

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Paper variant="outlined">
          <Box p={4}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} mt={2}>
                <Typography variant="h5">
                  <b>{title || 'Login or Sign Up'}</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {text ||
                    `Use your email or another service to continue with Write Release (it's free)!`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormSignIn />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
