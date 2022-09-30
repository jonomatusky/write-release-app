import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetch, clear } from 'redux/usersSlice'

export const useUsersStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetch = useCallback(async () => {
    await dispatchThunk(fetch)
  }, [dispatchThunk])

  const _clear = useCallback(() => {
    dispatch(clear())
  }, [dispatch])

  const { items, fetchStatus, error } = useSelector(state => state.users)

  const select = id => {
    return (items || []).find(item => item.id === id) || {}
  }

  return {
    fetch: _fetch,
    clear: _clear,
    select,
    items,
    fetchStatus,
    error,
  }
}

export default useUsersStore
