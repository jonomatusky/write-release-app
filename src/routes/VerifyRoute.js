import React, { useEffect, useState } from 'react'
import { useSession } from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import VerifyEmail from 'pages/VerifyEmail/VerifyEmail'
import firebase from 'config/firebase'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAlertStore from 'hooks/store/use-alert-store'

const VerifyRoute = ({ component: ReactComponent }) => {
  const { initializing } = useSession()
  const navigate = useNavigate()
  const { setError } = useAlertStore()

  const [, setSearchParams] = useSearchParams()

  const isEmailLink = firebase
    .auth()
    .isSignInWithEmailLink(window.location.href)

  let email = window.localStorage.getItem('email')

  const showVerify = isEmailLink && !email

  const [isLoggingInWithEmailLink, setIsLoggingInWithEmailLink] =
    useState(isEmailLink)

  useEffect(() => {
    const signIn = async email => {
      try {
        await firebase.auth().signInWithEmailLink(email, window.location.href)
        window.localStorage.removeItem('email')
        setSearchParams({})
        setIsLoggingInWithEmailLink(false)
      } catch (err) {
        setError({
          message:
            'Sorry, something went wrong. Please try signing in instead.',
        })
        window.localStorage.removeItem('email')
        setSearchParams({})
        setIsLoggingInWithEmailLink(false)
        navigate('/login')
      }
    }

    if (isEmailLink && !!email) {
      signIn(email)
    }
  }, [email, isEmailLink, setSearchParams, navigate, setError])

  if (showVerify) {
    return <VerifyEmail onSubmit={() => setIsLoggingInWithEmailLink(false)} />
  } else if (initializing || isLoggingInWithEmailLink) {
    return <Loading />
  } else {
    return <ReactComponent />
  }
}

export default VerifyRoute
