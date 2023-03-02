import React from 'react'
import { Box, Slide, Fade } from '@mui/material'
import { use100vh } from 'hooks/use-100-vh'

const LayoutStep = ({ children, index, step, prevStep }) => {

  const height = use100vh()

  return (
    <Box
      position="absolute"
      zIndex={index + 1 === step ? 1 : -index}
      maxWidth="sm"
      width="100%"
      height={height}
      pl={2}
      pr={2}
      overflow="hidden"
    >
      <Slide
        direction={(index + 1 === step) !== !!(step > prevStep) ? 'down' : 'up'}
        in={index + 1 === step}
        mountOnEnter
        unmountOnExit
        appear
        timeout={800}
        easing="ease-in-out"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Fade in={index + 1 === step} timeout={650} appear>
            <Box
              width="100%"
              maxHeight="100%"
              display="flex"
              justifyContent="center"
              pb="50px"
            >
              {children}
            </Box>
          </Fade>
        </Box>
      </Slide>
    </Box>
  )
}

export default LayoutStep
