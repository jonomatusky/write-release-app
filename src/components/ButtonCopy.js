import React from 'react'
import { Button } from '@mui/material'
import { FilterNone } from '@mui/icons-material'
import useCopy from 'hooks/use-copy'

const ButtonCopy = ({ children, text, ...props }) => {
  const { copy, isCopied } = useCopy()

  return (
    <Button endIcon={<FilterNone />} {...props} onClick={() => copy(text)}>
      {isCopied ? 'Copied!' : children}
    </Button>
  )
}

export default ButtonCopy
