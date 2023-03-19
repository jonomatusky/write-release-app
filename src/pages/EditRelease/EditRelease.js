import React from 'react'
import { Box } from '@mui/material'
import { use100vh } from 'hooks/use-100-vh'
import useSession from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { useParams } from 'react-router'
import Verify from './components/Verify'
import HeaderEdit from 'layouts/HeaderEdit'
import ReleaseEditor from './ReleaseEditor'
import AddAccountInfoDialog from 'components/AddAccountInfoDialog'
import useUserStore from 'hooks/store/use-user-store'

const EditRelease = () => {
  const { id } = useParams()
  const { user, initializing } = useSession()
  const { item: userFromStore, fetchStatus } = useUserStore()

  const height = use100vh()

  if (initializing) {
    return (
      <>
        {!!user && !initializing && <HeaderEdit />}
        <Loading />
      </>
    )
  } else if (!user) {
    return (
      <Box
        position="relative"
        width="100%"
        display="flex"
        justifyContent="center"
        height={height}
        alignItems="center"
      >
        <Box pb={5}>
          <Verify id={id} />
        </Box>
      </Box>
    )
  } else {
    if (fetchStatus === 'loading') {
      return <Loading />
    } else {
      return (
        <>
          {userFromStore?.id && <AddAccountInfoDialog />}
          <ReleaseEditor />
        </>
      )
    }
  }
}

export default EditRelease
