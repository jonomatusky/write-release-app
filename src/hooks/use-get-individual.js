import { useEffect, useCallback } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useIndividualsStore from './store/use-individuals-store'

const useGetIndividual = id => {
  const { getStatus, select, get, setAvatar } = useIndividualsStore()
  const individual = select(id)
  const { avatar, avatarUrl } = individual || {}

  const getIndividual = useCallback(
    async id => {
      try {
        await get(id)
      } catch (err) {}
    },
    [get]
  )

  useEffect(() => {
    if (getStatus === 'idle') {
      try {
        getIndividual(id)
      } catch (err) {}
    }
  }, [getIndividual, id, getStatus])

  const getAvatar = useCallback(async () => {
    const storage = getStorage()
    const storageRef = ref(storage, avatar)
    let url = await getDownloadURL(storageRef)

    setAvatar({ id, avatarUrl: url })
  }, [id, avatar, setAvatar])

  useEffect(() => {
    if (!!avatar && !avatarUrl) {
      getAvatar()
    }
  }, [avatar, avatarUrl, setAvatar, getAvatar])

  return { individual, status: getStatus }
}

export default useGetIndividual
