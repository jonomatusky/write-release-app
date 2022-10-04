import React from 'react'
import Loading from 'pages/Loading/Loading'
import useUserStore from 'hooks/store/use-user-store'
import NotFound from 'pages/NotFound/NotFound'

const BetaRoute = ({ component: ReactComponent }) => {
  const { item, fetchStatus } = useUserStore()

  if (fetchStatus !== 'succeeded') {
    return <Loading />
  } else if (item.beta) {
    return <ReactComponent />
  } else {
    return <NotFound />
  }
}

export default BetaRoute
