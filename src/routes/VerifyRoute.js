import React, { useEffect, useState } from 'react'
import { useSession } from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import VerifyEmail from 'pages/VerifyEmail/VerifyEmail'
import firebase from 'config/firebase'
import { useSearchParams } from 'react-router-dom'

const VerifyRoute = ({ component: ReactComponent, redirectPath }) => {
  const { initializing } = useSession()
  const [isLoadingEmailUser, setIsLoadingEmailUser] = useState(false)

  const [, setSearchParams] = useSearchParams()

  const isEmailLink = firebase
    .auth()
    .isSignInWithEmailLink(window.location.href)

  let email = window.localStorage.getItem('email')

  const showVerify = isEmailLink && !email

  useEffect(() => {
    const signIn = async email => {
      setIsLoadingEmailUser(true)
      await firebase.auth().signInWithEmailLink(email, window.location.href)
      window.localStorage.removeItem('email')
      // remove firebase query params from url
      setSearchParams({})
      setIsLoadingEmailUser(false)
    }

    if (isEmailLink && !!email) {
      try {
        signIn(email)
      } catch (err) {
        window.localStorage.removeItem('email')
        window.history.replaceState({}, document.title, '/')
        setIsLoadingEmailUser(false)
      }
    }
  }, [email, isEmailLink, setSearchParams])

  if (initializing || isLoadingEmailUser) {
    return <Loading />
  } else if (showVerify) {
    return <VerifyEmail />
  } else {
    return <ReactComponent />
  }
}

export default VerifyRoute
