import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
// import MuiAppBar from '@mui/material/AppBar'
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
import { Business, Person, Description, Flag, Tag } from '@mui/icons-material'
import useUserStore from 'hooks/store/use-user-store'
import Logo from 'assets/images/logo40svg.svg'
// import ButtonCopy from 'components/ButtonCopy'
import useSession from 'hooks/use-session'
import ScrollToTop from 'components/ScrollToTop'

// const { REACT_APP_PUBLIC_URL } = process.env

const drawerWidth = 220

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

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: prop => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(!open && {
//     marginLeft: `calc(${theme.spacing(7)} + 1px)`,
//     width: `calc(100% - ${theme.spacing(7)} - 1px)`,
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: `calc(${theme.spacing(8)} + 1px)`,
//       width: `calc(100% - ${theme.spacing(8)} - 1px)`,
//     },
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }))

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
        selected={'/' + pathname.split('/')[1] === path}
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
            mr: open ? 2 : 'auto',
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

const LayoutDrawerHeader = ({ open, children }) => {
  // const { user, logout } = useSession()
  const { user } = useSession()

  // const { id } = useParams()

  return (
    <>
      <ScrollToTop />
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
              <Toolbar variant="dense">
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
                      <img
                        src={Logo}
                        width="30px"
                        height="30px"
                        alt="sourceonlogo"
                      />
                    </Box>
                  }
                  color="primary"
                  component={Link}
                  to="/"
                  sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                  fullWidth
                  disableRipple
                  // maxWidth="100%"
                >
                  <Typography
                    variant="h6"
                    textTransform="none"
                    sx={{ opacity: open ? 1 : 0 }}
                  >
                    <b>SourceOn</b>
                  </Typography>
                </Button>
              </Toolbar>
            ) : (
              <Box display="flex" justifyContent="center">
                <IconButton
                  color="primary"
                  component={Link}
                  to="/"
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                  disableRipple
                  // maxWidth="100%"
                >
                  <img
                    src={Logo}
                    width="30px"
                    height="30px"
                    alt="sourceonlogo"
                  />
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
                    Icon={Description}
                    path="/stories"
                    beta
                  />
                  <DrawerItem
                    open={open}
                    label="Social"
                    Icon={Tag}
                    path="/social"
                    beta
                  />
                </List>
              </Box>
              <Box>
                <List>
                  <DrawerItem
                    open={open}
                    label="Requests & Bugs"
                    Icon={Flag}
                    component={MuiLink}
                    target="_blank"
                    href={`https://form.asana.com/?k=MTBXGOGWlSDhmqjbi4ipFw&d=38917462427951`}
                  />
                </List>
              </Box>
            </Box>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LayoutDrawerHeader
