import { useState, useEffect } from 'react'
import useRequest from './use-request'

const useIndividual = ({ id }) => {
  const { request, status } = useRequest()
  const [individual, setIndividual] = useState(null)

  useEffect(() => {
    const get = async i => {
      let res

      try {
        res = await request({
          url: `/individuals/${i}`,
          method: 'GET',
        })
      } catch (err) {
        console.log(err)
      }

      setIndividual(res)
    }

    if (!!id && status === 'idle') {
      get(id)
    }
  }, [id, status, request])

  return { individual, status }
}

export default useIndividual
