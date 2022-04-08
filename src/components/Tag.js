import { Box, Typography } from '@mui/core'
import React from 'react'

const Tag = ({ color, bgColor, name }) => {
  return (
    <Box borderRadius={10} color={color} bgColor={bgColor}>
      <Typography color="inherit">{name}</Typography>
    </Box>
  )
}

export default Tag
