import React from 'react'
import { useParams } from 'react-router-dom'

import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import useContentStore from 'hooks/store/use-content-store'
import useFetchContent from 'hooks/use-fetch-content'
import TextEditPage from './components/TextEditPage'
import useFetchResources from 'hooks/use-fetch-resources'

const ViewRelease = () => {
  const { id } = useParams()
  const { select, fetchStatus } = useContentStore()
  const content = select(id)

  useFetchContent()
  useFetchResources({ object: 'content', id })

  if (fetchStatus === 'loading' || fetchStatus === 'idle') {
    return <Loading />
  } else if (fetchStatus === 'failed' || !content.id) {
    return <NotFound />
  } else {
    return <TextEditPage />
  }
}

export default ViewRelease
