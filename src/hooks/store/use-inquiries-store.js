import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useThunk } from 'hooks/use-thunk'
import { setEntity, create } from 'redux/inquiriesSlice'
import useIndividualsStore from './use-individuals-store'

export const useInquiriesStore = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunk()

  const _setEntity = useCallback(
    entity => {
      dispatch(setEntity(entity))
    },
    [dispatch]
  )

  const clearEntity = useCallback(() => {
    dispatch(setEntity(null))
  }, [dispatch])

  const _create = useCallback(
    async data => {
      const item = await dispatchThunk(create, data)
      return item
    },
    [dispatchThunk]
  )

  const { entityId, entityType, createStatus } = useSelector(
    state => state.inquiries
  )

  const { select: selectIndividual } = useIndividualsStore()
  let entity

  switch (entityType) {
    case 'individual':
      entity = selectIndividual(entityId)
      break
    default:
      break
  }

  return {
    setEntity: _setEntity,
    clearEntity,
    entity,
    entityId,
    entityType,
    create: _create,
    createStatus,
  }
}

export default useInquiriesStore
