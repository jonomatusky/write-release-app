import { useEffect, useCallback } from 'react'

import useContentStore from './store/use-content-store'
import useSession from './use-session'

const useGetContent = id => {
  const { initializing } = useSession()
  const { getStatus, select, get } = useContentStore()

  const content = select(id)

  const getContent = useCallback(async () => {
    try {
      await get(id)
    } catch (err) {}
  }, [get, id])

  useEffect(() => {
    if (getStatus === 'idle' && !!id && !initializing) {
      getContent()
    }
  }, [getContent, id, getStatus, initializing])

  return { content, status: getStatus, get: getContent }
}

export default useGetContent
