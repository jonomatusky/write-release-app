import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'

const Link = ({ children, to, ...props }) => {
  return (
    <MuiLink component={to ? RouterLink : null} to={to} {...props}>
      {children}
    </MuiLink>
  )
}

export default Link
