import React from 'react'
import { Paper } from '@mui/material'

const Panel = ({ children }) => {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
      {children}
    </Paper>
  )
}

export default Panel
