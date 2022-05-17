import { useState, useCallback, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useIndividualStore from './store/use-individuals-store'
import useRequest from './use-request'

// import { useEffect } from 'react'
// import useCoverageStore from './store/use-coverage-store'

// const useFetchIndividual = (id) => {
//   const { fetch, fetchStatus, id: individualId, items } = useIndividualsStore()

//   useEffect(() => {
//     if (individualId !== id && fetchStatus === 'idle') {
//       fetch(id)
//     }
//   }, [id, object, fetchStatus, coverageId, fetch])

//   if (coverageId !== id) {
//     return { coverage: [], fetchStatus }
//   } else {
//     return { coverage: items, fetchStatus }
//   }
// }

// export default useFetchIndividual

const useFetchIndividual = id => {
  const { request, status } = useRequest()
  const [fetchedIndividual, setFetchedIndividual] = useState(null)
  const { select } = useIndividualStore()
  let reduxIndividual = select(id)

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
    } catch (err) {}
  }, [id, request])

  useEffect(() => {
    if (!individual.id && status === 'idle') {
      getIndividual()
    }
  }, [status, getIndividual, individual.id])

  return { individual, status }
}

export default useFetchIndividual
