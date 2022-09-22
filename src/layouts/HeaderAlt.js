import React from 'react'
import {
  Outlet,
  // useParams,
  // useLocation,
  useNavigate,
} from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import { ArrowBackIos } from '@mui/icons-material'
import { Box } from '@mui/system'
// import ButtonCopy from 'components/ButtonCopy'
import { useSession } from 'hooks/use-session'
import ScrollToTop from 'components/ScrollToTop'
// import Logo from 'assets/images/sourceon_logo.svg'
import ButtonReportBug from 'components/ButtonReportBug'
import useHistoryStore from 'hooks/store/use-history-store'
// import useIndividualsStore from 'hooks/store/use-individuals-store'
// import useInquiriesStore from 'hooks/store/use-inquiries-store'

// const { REACT_APP_PUBLIC_URL } = process.env

const HeaderAlt = () => {
  const { logout } = useSession()
  const { history } = useHistoryStore()
  const navigate = useNavigate()

  // const { id } = useParams()
  // const { select } = useIndividualsStore()
  // const individual = select(id)

  // const location = useLocation()
  // const { pathname } = location

  // const { setEntity } = useInquiriesStore()
  // const handleContact = () => {
  //   setEntity({
  //     entityType: 'individual',
  //     entityId: id,
  //   })
  // }

  const handleBack = () => {
    if (history.length > 1) {
      navigate(-1)
    } else {
      navigate('.')
    }
  }

  return (
    <>
      <ScrollToTop />
      <ButtonReportBug />
      <AppBar
        color="secondary"
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
        elevation={0}
      >
        <Toolbar variant="dense">
          <Box display="flex" width="100%" alignItems="center">
            <Box flexGrow={1}>
              <Button
                onClick={handleBack}
                startIcon={<ArrowBackIos />}
                color="inherit"
              >
                Back
              </Button>
            </Box>
            <Box flexGrow={0}>
              <Button color="inherit" size="small" onClick={logout}>
                Log Out
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default HeaderAlt
