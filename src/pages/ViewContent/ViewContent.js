import React from 'react'

import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import useContentStore from 'hooks/store/use-content-store'
import useFetchContent from 'hooks/use-fetch-content'
import TextEditPage from './components/TextEditPage'

const ViewContent = () => {
  const { fetchStatus } = useContentStore()

  useFetchContent()

  return (
    <>
      {(fetchStatus === 'loading' || fetchStatus === 'idle') && <Loading />}
      {fetchStatus === 'failed' && <NotFound />}
      {fetchStatus === 'succeeded' && <TextEditPage />}
    </>
  )
}
export default ViewContent
