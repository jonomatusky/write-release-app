import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { setError } from 'redux/alertSlice'
import { useSession } from './use-session'

export const useThunk = () => {
  const { user } = useSession()
  const dispatch = useDispatch()

  const dispatchThunk = useCallback(
    async (action, inputs) => {
      try {
        const headers = {}
        let token

        if (user) {
          try {
            token = await user.getIdToken()
          } catch (err) {
            // dispatch(
            //   setError({
            //     message: 'Unable to authenticate user. Please sign in again.',
            //   })
            // )
          }
        }

        if (token) {
          headers.Authorization = 'Bearer ' + token
        }

        const resultAction = await dispatch(action({ headers, ...inputs }))

        const result = unwrapResult(resultAction)

        return result
      } catch (err) {
        dispatch(
          setError({
            message:
              err.message || 'An unknown error occured. Please try again.',
          })
        )
        throw err
      }
    },
    [dispatch, user]
  )

  return dispatchThunk
}

export default useThunk
