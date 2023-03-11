import { useEffect } from 'react'
import useContentStore from './store/use-content-store'
import useSession from './use-session'

const useFetchContent = () => {
  const { fetch: fetchContent, fetchStatus: fetchContentStatus } =
    useContentStore()
  const { user } = useSession()

  useEffect(() => {
    if (!!user && fetchContentStatus === 'idle') {
      try {
        fetchContent()
      } catch (err) {}
    }
  }, [fetchContent, fetchContentStatus, user])
}

export default useFetchContent
