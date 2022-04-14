import React from 'react'
import { Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const ResponsiveAvatar = ({ avatarUrl }) => {
  return (
    <Box
      width="100%"
      position="relative"
      sx={{
        '&:after': { content: '""', display: 'block', paddingBottom: '100%' },
      }}
    >
      {avatarUrl ? (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          borderRadius="50%"
          sx={{
            backgroundImage: `url(${avatarUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          borderRadius="50%"
          color="grey.300"
          sx={{
            backgroundColor: 'grey.100',
          }}
        >
          <AccountCircle
            color="inherit"
            sx={{ width: '100%', height: '100%' }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ResponsiveAvatar
