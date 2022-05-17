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
  getCoverage,
} from 'redux/individualsSlice'

export const useIndividualsStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const {
    items,
    fetchStatus,
    getStatus,
    error,
    updateStatus,
    createStatus,
    filter,
    getCoverageStatus,
  } = useSelector(state => state.individuals)

  const select = id => {
    return (items || []).find(item => item.id === id) || {}
  }

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

  const _clear = useCallback(() => {
    dispatch(clear())
  }, [dispatch])

  const _getCoverage = useCallback(
    async id => {
      await dispatchThunk(getCoverage, { id })
    },
    [dispatchThunk]
  )

  const _setAvatar = useCallback(
    async ({ id, avatarUrl }) => {
      dispatch(setAvatar({ id, avatarUrl }))
    },
    [dispatch]
  )

  return {
    fetch: _fetch,
    get: _get,
    create: _create,
    update: _update,
    remove: _remove,
    clear: _clear,
    select,
    setAvatar: _setAvatar,
    getCoverage: _getCoverage,
    items,
    fetchStatus,
    getStatus,
    updateStatus,
    createStatus,
    getCoverageStatus,
    error,
    filter,
  }
}

export default useIndividualsStore
