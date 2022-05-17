import { useEffect } from 'react'
import useCoverageStore from './store/use-coverage-store'

const useFetchCoverage = ({ object, id }) => {
  const { fetch, fetchStatus, id: coverageId, items } = useCoverageStore()

  useEffect(() => {
    if (coverageId !== id && fetchStatus === 'idle') {
      try {
        fetch({ object, id })
      } catch (err) {}
    }
  }, [id, object, fetchStatus, coverageId, fetch])

  if (coverageId !== id) {
    return { coverage: [], fetchStatus }
  } else {
    return { coverage: items, fetchStatus }
  }
}

export default useFetchCoverage
