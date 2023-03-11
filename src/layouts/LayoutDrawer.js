import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import MuiAppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link as MuiLink,
  Button,
  IconButton,
  Typography,
} from '@mui/material'
import {
  PestControl,
  Business,
  Person,
  Create,
  // ContentCopy,
  // Create
} from '@mui/icons-material'
import useUserStore from 'hooks/store/use-user-store'
import Logo from 'assets/images/logo40svg.svg'
// import ButtonCopy from 'components/ButtonCopy'
import useSession from 'hooks/use-session'

// const { REACT_APP_PUBLIC_URL } = process.env

const drawerWidth = 200

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${theme.spacing(7)} - 1px)`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: `calc(${theme.spacing(8)} + 1px)`,
      width: `calc(100% - ${theme.spacing(8)} - 1px)`,
    },
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const DrawerItem = ({ open, label, Icon, path, beta, ...props }) => {
  const location = useLocation()
  const { pathname } = location
  const { item } = useUserStore()

  return !beta || (beta && item.beta === true) ? (
    <ListItem
      sx={{
        display: 'block',
      }}
      disablePadding
    >
      <ListItemButton
        component={Link}
        to={path}
        selected={pathname === path}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        {...props}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ) : (
    <></>
  )
}

const LayoutDrawer = ({ open, children }) => {
  const { user, logout } = useSession()

  const { id } = useParams()

  return (
    <Box display="flex">
      {!!user && (
        <Drawer
          variant="permanent"
          // sx={{
          //   width: drawerWidth,
          //   flexShrink: 0,
          //   [`& .MuiDrawer-paper`]: {
          //     width: drawerWidth,
          //     boxSizing: 'border-box',
          //   },
          //   display: { xs: 'none', sm: 'block' },
          // }}
          open={open}
        >
          {open ? (
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-start"
              height="48px"
            >
              <Button
                startIcon={
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: 0,
                      mr: open ? 0 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={Logo} width="30px" height="30px" alt="logo" />
                  </Box>
                }
                color="primary"
                component={Link}
                to="/"
                // sx={{ justifyContent: open ? 'initial' : 'center' }}
                fullWidth
                disableRipple
                maxWidth="100%"
              >
                <Typography
                  variant="h6"
                  textTransform="none"
                  sx={{ opacity: open ? 1 : 0 }}
                >
                  <b>SourceOn</b>
                </Typography>
              </Button>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center">
              <IconButton
                color="primary"
                component={Link}
                to="/"
                sx={{ justifyContent: open ? 'initial' : 'center' }}
                fullWidth
                disableRipple
                maxWidth="100%"
              >
                <img src={Logo} width="30px" height="30px" alt="sourceonlogo" />
              </IconButton>
            </Box>
          )}

          <Box
            // sx={{ overflow: 'auto' }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            width="100%"
          >
            <Box>
              <List>
                <DrawerItem
                  open={open}
                  label="Profiles"
                  Icon={Person}
                  path="/profiles"
                />
                <DrawerItem
                  open={open}
                  label="Companies"
                  Icon={Business}
                  path="/companies"
                />
                <DrawerItem
                  open={open}
                  label="Stories"
                  Icon={Create}
                  path="/stories"
                  beta
                />
                <DrawerItem
                  open={open}
                  label="Content (Beta)"
                  Icon={Create}
                  path="/content"
                  beta
                />
              </List>
            </Box>
            <Box>
              <List>
                <DrawerItem
                  open={open}
                  label="Report an Issue "
                  Icon={PestControl}
                  component={MuiLink}
                  target="_blank"
                  href={`https://form.asana.com/?k=MTBXGOGWlSDhmqjbi4ipFw&d=38917462427951`}
                  beta
                />
              </List>
            </Box>
          </Box>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {!!user ? (
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
                  {/* {id && (
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
                  )} */}
                  {!id && (
                    <Button color="primary" size="small" onClick={logout}>
                      Log Out
                    </Button>
                  )}
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        ) : (
          <></>
        )}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutDrawer
