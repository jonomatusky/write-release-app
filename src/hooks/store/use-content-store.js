import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { fetch, create, update, remove, clear, get } from 'redux/contentSlice'

export const useContentStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _get = useCallback(
    async id => {
      await dispatchThunk(get, { id })
    },
    [dispatchThunk]
  )

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
      const updated = await dispatchThunk(update, { id, ...data })
      return updated
    },
    [dispatchThunk]
  )

  const _remove = useCallback(
    async id => {
      await dispatchThunk(remove, { id })
    },
    [dispatchThunk]
  )

  const _clear = useCallback(() => {
    dispatch(clear())
  }, [dispatch])

  const {
    items,
    fetchStatus,
    error,
    updateStatus,
    createStatus,
    getStatus,
    filter,
    id,
    content,
  } = useSelector(state => state.content)

  const select = id => {
    return (items || []).find(item => item.id === id) || {}
  }

  return {
    get: _get,
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
    getStatus,
    error,
    filter,
    id,
    content,
  }
}

export default useContentStore
