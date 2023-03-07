import { useEffect } from 'react'

import { useUserStore } from './store/use-user-store'
import useSession from './use-session'
import useAlertStore from './store/use-alert-store'
import useContentTypesStore from './store/use-content-types-store'
import useTonesStore from './store/use-tones-store'

export const useFetch = () => {
  const { user } = useSession()
  const { setError } = useAlertStore()

  const { fetch: fetchUser, fetchStatus: userStatus } = useUserStore()
  const { fetch: fetchContentTypes, fetchStatus: fetchContentTypesStatus } =
    useContentTypesStore()
  const { fetch: fetchTones, fetchStatus: fetchTonesStatus } = useTonesStore()

  useEffect(() => {
    const get = async () => {
      try {
        await fetchUser()
      } catch (err) {
        setError({ message: err.message })
      }
    }
    if (!!user && userStatus === 'idle') {
      get()
    }
  }, [userStatus, fetchUser, setError, user])

  useEffect(() => {
    if (fetchContentTypesStatus === 'idle') {
      try {
        fetchContentTypes()
      } catch (err) {}
    }
  }, [fetchContentTypes, fetchContentTypesStatus])

  useEffect(() => {
    if (fetchTonesStatus === 'idle') {
      try {
        fetchTones()
      } catch (err) {}
    }
  }, [fetchTones, fetchTonesStatus])

  return
}
