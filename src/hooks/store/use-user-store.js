import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetch, update, remove, clear } from 'redux/userSlice'

export const useUserStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetch = useCallback(async () => {
    await dispatchThunk(fetch)
  }, [dispatchThunk])

  const _update = useCallback(
    async updates => {
      await dispatchThunk(update, { ...updates })
    },
    [dispatchThunk]
  )

  const _delete = useCallback(async () => {
    await dispatchThunk(remove)
  }, [dispatchThunk])

  const _clear = useCallback(() => {
    dispatch(clear())
  }, [dispatch])

  const { item, fetchStatus, updateStatus, error } = useSelector(
    state => state.user
  )

  return {
    fetch: _fetch,
    update: _update,
    delete: _delete,
    clear: _clear,
    item,
    fetchStatus,
    updateStatus,
    error,
  }
}

export default useUserStore
