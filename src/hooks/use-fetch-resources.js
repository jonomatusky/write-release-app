import { useEffect } from 'react'
import useResourcesStore from './store/use-resources-store'

const useFetchResources = ({ object, id }) => {
  const { fetch, fetchStatus, id: resourcesId, items } = useResourcesStore()

  useEffect(() => {
    if (resourcesId !== id && fetchStatus === 'idle') {
      try {
        fetch({ object, id })
      } catch (err) {}
    }
  }, [id, object, fetchStatus, resourcesId, fetch])

  if (resourcesId !== id) {
    return { resources: [], fetchStatus }
  } else {
    return { resources: items, fetchStatus }
  }
}

export default useFetchResources
