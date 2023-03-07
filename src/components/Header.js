import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Link as MuiLink,
} from '@mui/material'
import { Link } from 'react-router-dom'
import useSession from 'hooks/use-session'
import SearchBar from 'components/SearchBar'
import { AccountCircle } from '@mui/icons-material'
import Logo from 'assets/images/writerelease_logo_simple.png'

const Header = ({
  hideLogo,
  logoHref,
  logoTo,
  showSearch,
  showAvatar,
  showCreateButton,
  showTryItButton,
  showSignInButton,
  searchValue,
  setSearchValue,
  open,
}) => {
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
        <Toolbar
          disableGutters
          sx={{
            paddingLeft: '12px',
            paddingRight: '16px',
          }}
        >
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" height="100%" alignItems="center">
              {!hideLogo && (
                <Box
                  component={!!logoHref ? MuiLink : !!logoTo ? Link : null}
                  to={logoTo}
                  href={logoHref}
                  display="flex"
                  alignItems="center"
                  height="32px"
                  pb="4px"
                  sx={{ textDecoration: 'none' }}
                >
                  <img src={Logo} alt="WriteRelease" height="100%" />
                </Box>
              )}
            </Box>
            <Box display="flex" flexGrow={1} justifyContent="flex-end">
              {showSearch && (
                <Box width="350px" flexShrink={1}>
                  <SearchBar
                    size="small"
                    value={searchValue}
                    setValue={setSearchValue}
                  />
                </Box>
              )}
              {showCreateButton && (
                <Box pl={2}>
                  <Button
                    fullWidth
                    component={Link}
                    to="/create"
                    variant="contained"
                    // size="large"
                    sx={{ height: '40px' }}
                    elevation={0}
                  >
                    Start a Release
                  </Button>
                </Box>
              )}
              {showTryItButton && (
                <Box pl={2}>
                  <Button
                    fullWidth
                    component={Link}
                    to="/try-it"
                    variant="contained"
                    // size="large"
                    sx={{ height: '40px' }}
                    elevation={0}
                  >
                    Start a Release
                  </Button>
                </Box>
              )}
              {showAvatar && (
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
                    <MenuItem component={Link} to="/account">
                      My Account
                    </MenuItem>
                    <MenuItem onClick={logout}>Log Out</MenuItem>
                  </Menu>
                </Box>
              )}
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

export default Header
