import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setMessage, setError } from 'redux/alertSlice'

export const useAlertStore = () => {
  const dispatch = useDispatch()

  const _setMessage = useCallback(
    ({ message }) => {
      dispatch(setMessage({ message }))
    },
    [dispatch]
  )

  const _setError = useCallback(
    ({ message }) => {
      dispatch(setError({ message }))
    },
    [dispatch]
  )

  const clearMessage = useCallback(() => {
    dispatch(setMessage({ message: null }))
  }, [dispatch])

  const clearError = useCallback(() => {
    dispatch(setError({ message: null }))
  }, [dispatch])

  const { message, error } = useSelector(state => state.alert)

  return {
    setMessage: _setMessage,
    setError: _setError,
    clearMessage,
    clearError,
    message,
    error,
  }
}

export default useAlertStore
