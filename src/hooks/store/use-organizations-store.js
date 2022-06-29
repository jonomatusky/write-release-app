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
  setLogo,
  getCoverage,
  getIndividuals,
} from 'redux/organizationsSlice'

export const useOrganizationsStore = () => {
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
    getIndividualsStatus,
  } = useSelector(state => state.organizations)

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
      const item = await dispatchThunk(create, experience)
      return item
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

  const _getIndividuals = useCallback(
    async id => {
      await dispatchThunk(getIndividuals, { id })
    },
    [dispatchThunk]
  )

  const _setLogo = useCallback(
    async ({ id, logoUrl }) => {
      dispatch(setLogo({ id, logoUrl }))
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
    setLogo: _setLogo,
    getCoverage: _getCoverage,
    getIndividuals: _getIndividuals,
    items,
    fetchStatus,
    getStatus,
    updateStatus,
    createStatus,
    getCoverageStatus,
    getIndividualsStatus,
    error,
    filter,
  }
}

export default useOrganizationsStore
