import React from 'react'
import { Box } from '@mui/material'
import LinkPreview from './LinkPreview'
import ButtonEditHighlight from './ButtonEditHighlight'

const Highlight = ({ index, highlights }) => {
  const highlight = highlights[index] || {}
  const { url, image, title, outlet } = highlight

  return (
    <Box position="relative">
      <Box position="absolute" zIndex="50" top="3px" right="3px">
        <ButtonEditHighlight index={index} />
      </Box>
      <LinkPreview url={url} image={image} title={title} outlet={outlet} />
    </Box>
  )
}

export default Highlight
