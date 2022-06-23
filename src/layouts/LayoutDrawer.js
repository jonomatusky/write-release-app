import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link as MuiLink,
} from '@mui/material'
import { BugReport, Business, Person } from '@mui/icons-material'

const drawerWidth = 200

const LayoutDrawer = ({ children }) => {
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Toolbar variant="dense" />
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
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/profiles"
                  selected={location.pathname === '/profiles'}
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="People" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/companies"
                  selected={location.pathname === '/companies'}
                >
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText primary="Companies" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={MuiLink}
                  target="_blank"
                  href="https://airtable.com/shrgP0cjfUzl2lSHS"
                >
                  <ListItemIcon>
                    <BugReport />
                  </ListItemIcon>
                  <ListItemText primary="Report a Bug" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
}

export default LayoutDrawer
