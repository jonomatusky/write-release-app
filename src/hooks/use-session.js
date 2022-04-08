import { useContext } from 'react'

import { UserContext } from 'contexts/user-context'

export const useSession = () => {
  const { user, logout, initializing } = useContext(UserContext)
  //remember to switch this back
  return { user: {}, logout, initializing }
}

export default useSession
