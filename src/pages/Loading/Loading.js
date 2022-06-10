import React from 'react'
import { Box, CircularProgress } from '@mui/material'

import Div100vh from 'components/Div100vh'
import usePageTitle from 'hooks/use-page-title'

const Loading = () => {
  usePageTitle()

  return (
    <Div100vh width="100%">
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex="20"
        textAlign="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    </Div100vh>
  )
}

export default Loading
