import React from 'react'
import { useParams } from 'react-router-dom'

import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import useContentStore from 'hooks/store/use-content-store'
import useFetchContent from 'hooks/use-fetch-content'
import TextEditPage from './components/TextEditPage'

const ViewContent = () => {
  const { id } = useParams()
  const { select, fetchStatus } = useContentStore()
  const content = select(id)

  useFetchContent()

  return (
    <>
      {(fetchStatus === 'loading' || fetchStatus === 'idle') && <Loading />}
      {(fetchStatus === 'failed' || !content) && <NotFound />}
      {fetchStatus === 'succeeded' && !!content && <TextEditPage />}
    </>
  )
}
export default ViewContent
