import React, { useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  Link as MuiLink,
  IconButton,
} from '@mui/material'
import FormSignIn from 'components/FormSignIn'
import { Link } from 'react-router-dom'
import Header from 'components/Header'
import { ArrowBackIos } from '@mui/icons-material'

const Login = ({ isLogin }) => {
  const [showEmailWasSent, setShowEmailWasSent] = useState(false)

  const handleSubmit = ({ method }) => {
    if (method === 'email') {
      setShowEmailWasSent(true)
    }
  }

  return (
    <>
      <Header
        showTryItButton={isLogin}
        logoHref={isLogin ? 'https://www.writerelease.com' : null}
      />
      <Container maxWidth="xs">
        <Box mt={10}>
          <Paper variant="outlined">
            <Box p={4}>
              <Grid container justifyContent="center" spacing={4}>
                {showEmailWasSent && (
                  <>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() => setShowEmailWasSent(false)}
                          // sx={{ float: 'right' }}
                        >
                          <ArrowBackIos />
                        </IconButton>
                        <Typography variant="h5">
                          <b>Email was sent</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Check your email for a link to sign into your account.
                      </Typography>
                    </Grid>
                  </>
                )}
                {!showEmailWasSent && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h5" pb={1}>
                        <b>
                          {isLogin ? 'Sign In' : 'Create your free account'}
                        </b>
                      </Typography>
                      <Typography variant="body2">
                        Or{' '}
                        <MuiLink
                          component={Link}
                          to={isLogin ? '/signup' : '/login'}
                        >
                          {isLogin ? 'create an account' : 'sign in'}
                        </MuiLink>
                      </Typography>
                    </Grid>

                    {/* <Grid item xs={12}>
                <Typography variant="body2">
                  {text ||
                    `Use your email or another service to continue with Write Release (it's free)!`}
                </Typography>
              </Grid> */}
                    <Grid item xs={12}>
                      <FormSignIn onSubmit={handleSubmit} redirectUrl={'/'} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        component="p"
                        textAlign="center"
                      >
                        By using this service, you agree to our{' '}
                        <Link
                          href="https://writerelease.com/terms-conditions"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms of Service and Privacy Policy
                        </Link>
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default Login
