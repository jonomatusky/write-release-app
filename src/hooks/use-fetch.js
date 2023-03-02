import { useEffect } from 'react'

import { useUserStore } from './store/use-user-store'
import useIndividualsStore from './store/use-individuals-store'
import useOrganizationsStore from './store/use-organizations-store'
import useTagsStore from './store/use-tags-store'
import useSession from './use-session'
import useAlertStore from './store/use-alert-store'
import useIndustriesStore from './store/use-industries-store'
import useContentTypesStore from './store/use-content-types-store'
import useTonesStore from './store/use-tones-store'

export const useFetch = () => {
  const { user } = useSession()
  const { setError } = useAlertStore()

  const { fetch: fetchIndividuals, fetchStatus: individualsStatus } =
    useIndividualsStore()
  const { fetch: fetchOrganizations, fetchStatus: organizationsStatus } =
    useOrganizationsStore()
  const { fetch: fetchTags, fetchStatus: tagsStatus } = useTagsStore()
  const { fetch: fetchIndustries, fetchStatus: industriesStatus } =
    useIndustriesStore()
  const { fetch: fetchUser, fetchStatus: userStatus } = useUserStore()
  const { fetch: fetchContentTypes, fetchStatus: fetchContentTypesStatus } =
    useContentTypesStore()
  const { fetch: fetchTones, fetchStatus: fetchTonesStatus } = useTonesStore()

  useEffect(() => {
    const get = async () => {
      try {
        await fetchIndividuals()
      } catch (err) {
        setError({ message: err.message })
      }
    }
    if (
      !!user &&
      // fetchUserStatus === 'succeeded' &&
      individualsStatus === 'idle'
      // && !!storeUser._id
    ) {
      get()
    }
  }, [
    // fetchUserStatus,
    individualsStatus,
    fetchIndividuals,
    // storeUser,
    setError,
    user,
  ])

  useEffect(() => {
    const get = async () => {
      try {
        await fetchOrganizations()
      } catch (err) {
        setError({ message: err.message })
      }
    }
    if (
      !!user &&
      // fetchUserStatus === 'succeeded' &&
      organizationsStatus === 'idle'
      // && !!storeUser._id
    ) {
      get()
    }
  }, [
    // fetchUserStatus,
    organizationsStatus,
    fetchOrganizations,
    // storeUser,
    setError,
    user,
  ])

  useEffect(() => {
    const get = async () => {
      try {
        await fetchTags()
      } catch (err) {
        setError({ message: err.message })
      }
    }
    if (
      !!user &&
      // fetchUserStatus === 'succeeded' &&
      tagsStatus === 'idle'
      // && !!storeUser._id
    ) {
      get()
    }
  }, [
    // fetchUserStatus,
    tagsStatus,
    fetchTags,
    // storeUser,
    setError,
    user,
  ])

  useEffect(() => {
    const get = async () => {
      try {
        await fetchIndustries()
      } catch (err) {
        setError({ message: err.message })
      }
    }
    if (
      !!user &&
      // fetchUserStatus === 'succeeded' &&
      industriesStatus === 'idle'
      // && !!storeUser._id
    ) {
      get()
    }
  }, [
    // fetchUserStatus,
    industriesStatus,
    fetchIndustries,
    // storeUser,
    setError,
    user,
  ])

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
