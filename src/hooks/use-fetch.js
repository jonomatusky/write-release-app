import { useEffect } from 'react'

// import { useUserStore } from './store/use-user-store'
import useIndividualsStore from './store/use-individuals-store'
import useTagsStore from './store/use-tags-store'
import useSession from './use-session'
import useAlertStore from './store/use-alert-store'

export const useFetch = () => {
  const { user } = useSession()
  const { setError } = useAlertStore()

  // const {
  //   fetchUser,
  //   fetchStatus: fetchUserStatus,
  //   user: storeUser,
  //   subscribe,
  // } = useUserStore()
  const { fetch: fetchIndividuals, fetchStatus: individualsStatus } =
    useIndividualsStore()
  const { fetch: fetchTags, fetchStatus: tagsStatus } = useTagsStore()

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       await fetchUser()
  //     } catch (err) {
  //       setError({ message: err.message })
  //     }
  //   }

  //   if (!!user && fetchUserStatus === 'idle') {
  //     fetch()
  //   }
  // }, [user, fetchUser, fetchUserStatus, setError, subscribe])

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

  return
}
