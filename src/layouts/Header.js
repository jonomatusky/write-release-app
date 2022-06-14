import React from 'react'
import { Outlet, Link, useParams } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { ArrowBackIos, Email } from '@mui/icons-material'
import { Box } from '@mui/system'
import ButtonCopy from 'components/ButtonCopy'
import { useSession } from 'hooks/use-session'
import ScrollToTop from 'components/ScrollToTop'
import Logo from 'assets/images/sourceon_logo.svg'
import ButtonReportBug from 'components/ButtonReportBug'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import useInquiriesStore from 'hooks/store/use-inquiries-store'

const { REACT_APP_PUBLIC_URL } = process.env

const Header = () => {
  const { user, logout } = useSession()
  const { pid } = useParams()
  const { select } = useIndividualsStore()
  const individual = select(pid)

  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: 'individual',
      entityId: pid,
    })
  }

  return (
    <>
      <ScrollToTop />
      <ButtonReportBug />
      <AppBar color="secondary">
        <Toolbar variant="dense">
          <Box display="flex" width="100%" alignItems="center">
            <Box flexGrow={1}>
              {user && pid ? (
                <Button
                  startIcon={<ArrowBackIos />}
                  component={Link}
                  to={'/'}
                  color="inherit"
                >
                  Home
                </Button>
              ) : (
                <Button
                  startIcon={
                    <img
                      src={Logo}
                      width="20px"
                      height="20px"
                      alt="sourceonlogo"
                    />
                  }
                  color="inherit"
                  component={Link}
                  to="/"
                >
                  <Typography variant="h6" textTransform="none">
                    <b>SourceOn</b>
                  </Typography>
                </Button>
              )}
            </Box>
            <Box flexGrow={0}>
              {user && pid && (
                <ButtonCopy
                  variant="outlined"
                  color="inherit"
                  fontSize="small"
                  size="small"
                  text={`${REACT_APP_PUBLIC_URL}/profiles/${pid}`}
                  sx={{ borderRadius: 28 }}
                >
                  Copy Link
                </ButtonCopy>
              )}
              {user && !pid && (
                <Button color="inherit" size="small" onClick={logout}>
                  Log Out
                </Button>
              )}
              {!user && individual && individual.email && (
                <Button
                  variant="outlined"
                  color="inherit"
                  fontSize="small"
                  size="small"
                  onClick={handleContact}
                  sx={{
                    borderRadius: 28,
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                  endIcon={<Email />}
                >
                  Contact
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Toolbar variant="dense" />
        <Outlet />
      </main>
    </>
  )
}

export default Header
