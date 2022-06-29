import { useEffect } from 'react'

// import { useUserStore } from './store/use-user-store'
import useIndividualsStore from './store/use-individuals-store'
import useOrganizationsStore from './store/use-organizations-store'
import useTagsStore from './store/use-tags-store'
import useSession from './use-session'
import useAlertStore from './store/use-alert-store'
import useIndustriesStore from './store/use-industries-store'

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

  return
}
