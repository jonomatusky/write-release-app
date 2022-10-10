import React from 'react'
import { Paper } from '@mui/material'

const Panel = ({ children, ...props }) => {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2 }} {...props}>
      {children}
    </Paper>
  )
}

export default Panel
