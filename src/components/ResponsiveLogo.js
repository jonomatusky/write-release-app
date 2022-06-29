import React from 'react'
import { Box } from '@mui/material'
import { PhotoSizeSelectActual } from '@mui/icons-material'

const ResponsiveLogo = ({ src }) => {
  return (
    <>
      {src ? (
        <Box
          width="100%"
          height="100%"
          sx={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <Box
          width="100%"
          height="100%"
          color="grey.300"
          bgcolor="grey.100"
          display="flex"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
        >
          <Box width="50%" height="50%">
            <PhotoSizeSelectActual
              color="inherit"
              sx={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default ResponsiveLogo
