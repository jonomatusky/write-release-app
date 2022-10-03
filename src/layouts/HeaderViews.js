import React from 'react'
import { AppBar, Toolbar, Box, Button } from '@mui/material'
import useSession from 'hooks/use-session'
import { Outlet } from 'react-router'

const HeaderViews = ({ open }) => {
  const { logout } = useSession()

  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        elevation={0}
        sx={{
          // zIndex: theme => theme.zIndex.drawer + 1,
          // width: `calc(100% - ${drawerWidth}px)`,
          // ml: `${drawerWidth}px`,
          borderBottom: '1px solid #e0e0e0',
        }}
        open={open}
      >
        <Toolbar variant="dense">
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box flexGrow={0}>
              <Button color="primary" size="small" onClick={logout}>
                Log Out
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <Outlet />
    </>
  )
}

export default HeaderViews
