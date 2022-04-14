import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import {
  fetch,
  get,
  create,
  update,
  remove,
  clear,
  setAvatar,
} from 'redux/individualsSlice'

export const useIndividualStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _fetch = useCallback(async () => {
    await dispatchThunk(fetch)
  }, [dispatchThunk])

  const _get = useCallback(
    async id => {
      await dispatchThunk(get, { id })
    },
    [dispatchThunk]
  )

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

  const _setAvatar = useCallback(
    async ({ id, avatarUrl }) => {
      dispatch(setAvatar({ id, avatarUrl }))
    },
    [dispatch]
  )

  const { items, fetchStatus, error, updateStatus, createStatus, filter } =
    useSelector(state => state.individuals)

  const select = id => {
    return (items || []).find(item => item.id === id) || {}
  }

  return {
    fetch: _fetch,
    get: _get,
    create: _create,
    update: _update,
    remove: _remove,
    clear: _clear,
    select,
    setAvatar: _setAvatar,
    items,
    fetchStatus,
    updateStatus,
    createStatus,
    error,
    filter,
  }
}

export default useIndividualStore
