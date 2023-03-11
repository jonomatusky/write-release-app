import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSession } from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import VerifyEmail from 'pages/VerifyEmail/VerifyEmail'
import firebase from 'config/firebase'

const PrivateRoute = ({ component: ReactComponent, redirectPath }) => {
  const { user, initializing } = useSession()
  let location = useLocation()

  const isEmailLink = firebase
    .auth()
    .isSignInWithEmailLink(window.location.href)

  let email = window.localStorage.getItem('email')

  const showVerify = isEmailLink && !email

  const [isLoggingInWithEmailLink, setIsLoggingInWithEmailLink] =
    useState(isEmailLink)

  const signIn = async email => {
    await firebase.auth().signInWithEmailLink(email, window.location.href)
    window.localStorage.removeItem('email')
  }

  useEffect(() => {
    if (isEmailLink && !!email) {
      try {
        signIn(email)
      } catch (err) {
        window.localStorage.removeItem('email')
      }
      setIsLoggingInWithEmailLink(false)
    }
  }, [email, isEmailLink])

  if (initializing || isLoggingInWithEmailLink) {
    return <Loading />
  } else if (showVerify) {
    return <VerifyEmail />
  } else if (!!user) {
    return <ReactComponent />
  } else {
    return (
      <Navigate
        replace
        to={redirectPath || '/login'}
        state={{ from: location }}
      />
    )
  }
}

export default PrivateRoute
