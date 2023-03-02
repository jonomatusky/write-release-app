import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'

const RestrictedPublicRoute = ({ component: ReactComponent, redirectPath }) => {
  const { user, initializing } = useSession()

  if (initializing) {
    return <Loading />
  } else if (!user) {
    return <ReactComponent />
  } else {
    return <Navigate replace to={redirectPath || '/'} />
  }
}

export default RestrictedPublicRoute
