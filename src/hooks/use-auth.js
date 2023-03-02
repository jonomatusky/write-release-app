import { useState, useEffect, useCallback } from 'react'
import firebase from 'config/firebase'
import posthog from 'posthog-js'
// import useUserStore from 'hooks/store/use-user-store'

const { REACT_APP_POSTHOG_KEY } = process.env

export const useAuth = () => {
  // const { clearUser } = useUserStore()

  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user,
      verifyingEmail: false
    }
  })

  const logout = useCallback(async () => {
    try {
      await firebase.auth().signOut()
      // clearUser()
      !!REACT_APP_POSTHOG_KEY && posthog.reset()
    } catch (err) {}
  }, [])

  useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        setState({ initializing: false, user: null, verifyingEmail: true })
      }
      // The client SDK will parse the code from the link for you.

      console.log(email)

      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(({ user }) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn')

          setState({ initializing: false, user })
        })
        .catch(error => {
          console.log(error)
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        })
    } else {
      // listen for auth state changes
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        setState({ initializing: false, user })
        if (!!user && user.email) {
          !!REACT_APP_POSTHOG_KEY &&
            posthog.identify(user.uid, {
              email: user.email,
              displayName: user.displayName,
            })
        }
      })

      // unsubscribe to the listener when unmounting
      return () => unsubscribe()
    }
  }, [])

  return { ...state, logout }
}
