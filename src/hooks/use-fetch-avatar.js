import { useEffect, useCallback } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useIndividualStore from './store/use-individuals-store'

const useFetchAvatar = id => {
  const { select, setAvatar } = useIndividualStore()

  const individual = select(id)
  const { avatar, avatarUrl } = individual

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
}

export default useFetchAvatar
