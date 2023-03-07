import React, { useState } from 'react'
import firebase from 'config/firebase'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import GoogleLogo from 'assets/images/google_logo.svg'
import useAlertStore from 'hooks/store/use-alert-store'

const ButtonSignInWithGoogle = ({
  redirectUrl,
  onClick,
  onSuccess,
  replace,
}) => {
  const [googleSignInIsLoading, setGoogleSignInIsLoading] = useState(false)
  const navigate = useNavigate()

  const { setError, clearError } = useAlertStore()

  var provider = new firebase.auth.GoogleAuthProvider()

  const handleSignInWithGoogle = async () => {
    setGoogleSignInIsLoading(true)
    clearError()
    try {
      !!onClick && (await onClick())
      await firebase.auth().signInWithPopup(provider)
      !!onSuccess && (await onSuccess())
      !!redirectUrl && navigate(redirectUrl, { replace })
    } catch (err) {
      setGoogleSignInIsLoading(false)
      setError({ message: 'An error occurred. Please try again.' })
    }
  }

  return (
    <LoadingButton
      type="button"
      variant="outlined"
      size="large"
      fullWidth
      sx={{
        height: '51.5px',
        textTransform: 'none',
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
  )
}

export default ButtonSignInWithGoogle
