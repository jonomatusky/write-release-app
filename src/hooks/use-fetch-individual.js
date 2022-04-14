import { useState, useCallback, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useIndividualStore from './store/use-individuals-store'
import useRequest from './use-request'

const useFetchIndividual = id => {
  const { request, status } = useRequest()
  const [fetchedIndividual, setFetchedIndividual] = useState(null)
  const { items: individuals } = useIndividualStore()
  let reduxIndividual = individuals.find(item => !!item.id && item.id === id)

  let individual = reduxIndividual || fetchedIndividual

  const getIndividual = useCallback(async () => {
    try {
      const { data } = await request({
        url: `/individuals/${id}`,
      })

      const avatar = data.avatar
      let url

      if (avatar) {
        const storage = getStorage()
        const storageRef = ref(storage, data.avatar)
        url = await getDownloadURL(storageRef)
      }

      setFetchedIndividual({ ...data, avatarUrl: url })
    } catch (err) {
      console.log(err)
    }
  }, [id, request])

  useEffect(() => {
    if (!individual && status === 'idle') {
      getIndividual()
    }
  })

  return { individual, status }
}

export default useFetchIndividual
