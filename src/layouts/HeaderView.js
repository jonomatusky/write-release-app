import React from 'react'
import { Button, AppBar, Toolbar, Box, Typography } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import ButtonCopy from 'components/ButtonCopy'
import { ContentCopy } from '@mui/icons-material'
import useSession from 'hooks/use-session'
import Logo from 'assets/images/logo40svg.svg'

const { REACT_APP_PUBLIC_URL } = process.env

const HeaderView = ({ open, copy }) => {
  const { user } = useSession()
  const { pathname } = useLocation()

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
            justifyContent="space-between"
          >
            <Box>
              {!user && (
                <Button
                  startIcon={
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0,
                      }}
                    >
                      <img
                        src={Logo}
                        width="30px"
                        height="30px"
                        alt="sourceonlogo"
                      />
                    </Box>
                  }
                  color="primary"
                  disableRipple
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                      cursor: 'default',
                    },
                  }}
                >
                  <Typography variant="h6" textTransform="none">
                    <b>SourceOn</b>
                  </Typography>
                </Button>
              )}
            </Box>
            {copy && (
              <ButtonCopy
                variant="outlined"
                color="inherit"
                fontSize="small"
                size="small"
                text={REACT_APP_PUBLIC_URL + pathname}
                endIcon={<ContentCopy />}
                sx={{ borderRadius: 28, paddingRight: 2, paddingLeft: 2 }}
              >
                Copy Link
              </ButtonCopy>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <Outlet />
    </>
  )
}

export default HeaderView
