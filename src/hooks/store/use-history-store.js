import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { add } from 'redux/historySlice'

export const useHistoryStore = () => {
  const dispatch = useDispatch()

  const _add = useCallback(
    location => {
      dispatch(add(location))
    },
    [dispatch]
  )

  const { history } = useSelector(state => state.history)

  return {
    add: _add,
    history,
  }
}

export default useHistoryStore
