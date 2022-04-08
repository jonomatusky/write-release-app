import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Coffee } from '@mui/icons-material'

const Header = () => {
  return (
    <>
      <AppBar color="secondary">
        <Toolbar variant="dense">
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
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Header
