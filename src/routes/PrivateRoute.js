import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSession } from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import AddAccountInfoDialog from 'components/AddAccountInfoDialog'
import useUserStore from 'hooks/store/use-user-store'

const PrivateRoute = ({ component: ReactComponent, redirectPath }) => {
  const { user, initializing } = useSession()
  const { item: userFromStore, fetchStatus } = useUserStore()
  let location = useLocation()

  if (initializing) {
    return <Loading />
  } else if (!!user) {
    if (fetchStatus === 'loading') {
      return <Loading />
    } else {
      return (
        <>
          {userFromStore?.id && <AddAccountInfoDialog />}
          <ReactComponent />
        </>
      )
    }
  } else {
    return (
      <Navigate
        replace
        to={redirectPath || '/login'}
        state={{ from: location }}
      />
    )
  }
}

export default PrivateRoute
