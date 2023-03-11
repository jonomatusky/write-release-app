import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

const HeaderClose = () => {
  return (
    <Box
      position="absolute"
      zIndex={100}
      top={0}
      left={0}
      right={0}
      display="flex"
    >
      <Box
        pl={1}
        pr={1}
        pt={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        height={50}
      >
        <IconButton
          component={RouterLink}
          to="/releases"
          size="large"
          disableRipple
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  )
}

export default HeaderClose
