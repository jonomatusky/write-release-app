import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import useSession from 'hooks/use-session'
import SearchBar from 'components/SearchBar'
import { AccountCircle } from '@mui/icons-material'

const HeaderViews = ({ searchValue, setSearchValue, open }) => {
  const { user, logout } = useSession()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

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
        <Toolbar>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box width="350px" flexShrink={1}>
              <SearchBar
                size="small"
                value={searchValue}
                setValue={setSearchValue}
              />
            </Box>
            <Box pl={2}>
              <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                {user.photoURL ? (
                  <Avatar alt="My Account" src={user.photoURL} />
                ) : (
                  <Avatar alt="My Account">
                    <AccountCircle />
                  </Avatar>
                )}
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                transitionDuration={0}
                anchorOrigin={{
                  horizontal: 'left',
                  vertical: 'bottom',
                }}
                anchorPosition={{ left: 0, top: -20 }}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
              >
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </Box>

            {/* <Box flexGrow={0}>
              <Button color="primary" size="small" onClick={logout}>
                Log Out
              </Button>
            </Box> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default HeaderViews
