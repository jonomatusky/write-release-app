import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Box, Grid, Typography, Button, Paper } from '@mui/material'
import firebase from 'config/firebase'

import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'assets/images/google_logo.svg'

const Login = ({ title, text }) => {
  const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/'

  const { setError, clearError } = useAlertStore()

  var provider = new firebase.auth.GoogleAuthProvider()

  const handleSignInWithGoogle = async () => {
    clearError()
    try {
      await firebase.auth().signInWithPopup(provider)
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
      setError({ message: 'Unable to sign in' })
    }
  }

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Paper variant="outlined">
          <Box p={2}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  <b>{title || 'Sign In'}</b>
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography>
                  Pleae log in to continue. Access is restricted to
                  @gregoryfca.com users.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  color="secondary"
                  fullWidth
                  sx={{
                    height: '51.5px',
                    textTransform: 'none',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                  onClick={handleSignInWithGoogle}
                >
                  <Box display="flex" mr="20px">
                    <img
                      src={GoogleLogo}
                      alt="Google Logo"
                      style={{ height: '24px', width: '24px' }}
                    />
                  </Box>
                  <Typography
                    letterSpacing={1}
                    style={{ fontWeight: 500 }}
                    color="text.secondary"
                  >
                    Sign in with Google
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
