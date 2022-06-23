import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetch, create, update, remove, clear } from 'redux/industriesSlice'

export const useIndustrysStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetch = useCallback(async () => {
    await dispatchThunk(fetch)
  }, [dispatchThunk])

  const _create = useCallback(
    async experience => {
      const newExperience = await dispatchThunk(create, experience)
      return newExperience
    },
    [dispatchThunk]
  )

  const _update = useCallback(
    async ({ id, ...data }) => {
      await dispatchThunk(update, { id, ...data })
    },
    [dispatchThunk]
  )

  const _remove = useCallback(
    async id => {
      await dispatchThunk(remove, { id })
    },
    [dispatchThunk]
  )

  const _clear = useCallback(
    image => {
      dispatch(clear())
    },
    [dispatch]
  )

  const { items, fetchStatus, error, updateStatus, createStatus, filter } =
    useSelector(state => state.industries)

  const select = id => {
    return (items || []).find(item => item.id === id) || {}
  }

  return {
    fetch: _fetch,
    create: _create,
    update: _update,
    remove: _remove,
    clear: _clear,
    select,
    items,
    fetchStatus,
    updateStatus,
    createStatus,
    error,
    filter,
  }
}

export default useIndustrysStore
