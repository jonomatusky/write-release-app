import React from 'react'
import { Outlet, Link, useParams } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Coffee, ArrowBackIos } from '@mui/icons-material'
import { Box } from '@mui/system'
import ButtonCopy from 'components/ButtonCopy'
import { useSession } from 'hooks/use-session'

const { REACT_APP_PUBLIC_URL } = process.env

const Header = () => {
  const { user, logout } = useSession()
  const { pid } = useParams()

  return (
    <>
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
                  startIcon={<Coffee />}
                  color="inherit"
                  component={Link}
                  to="/"
                >
                  <Typography variant="h6" textTransform="none">
                    <b>joe</b>
                  </Typography>
                </Button>
              )}
            </Box>
            <Box flexGrow={0}>
              {pid && (
                <ButtonCopy
                  variant="outlined"
                  color="inherit"
                  fontSize="small"
                  size="small"
                  text={`${REACT_APP_PUBLIC_URL}/profiles/${pid}`}
                >
                  Copy Link
                </ButtonCopy>
              )}
              {user && !pid && (
                <Button color="inherit" size="small" onClick={logout}>
                  Log Out
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
