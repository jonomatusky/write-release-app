import { useEffect, useCallback } from 'react'

import useContentStore from './store/use-content-store'
import useSession from './use-session'

const useGetContent = id => {
  const { initializing } = useSession()
  const { getStatus, select, get } = useContentStore()

  const content = select(id)

  const getContent = useCallback(
    async id => {
      try {
        await get(id)
      } catch (err) {}
    },
    [get]
  )

  useEffect(() => {
    if (getStatus === 'idle' && !!id && !initializing) {
      getContent(id)
    }
  }, [getContent, id, getStatus, initializing])

  return { content, status: getStatus }
}

export default useGetContent
