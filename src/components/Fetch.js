import React from 'react'
import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'

const Fetch = () => {
  useFetch()
  usePageTrack()

  return <></>
}

export default Fetch
