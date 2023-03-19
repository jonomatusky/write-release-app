import React from 'react'
import { ContentCopy } from '@mui/icons-material'
import useCopy from 'hooks/use-copy'
import { LoadingButton } from '@mui/lab'

const ButtonCopy = ({ children, text, ...props }) => {
  const { copy, isCopied } = useCopy()

  return (
    <LoadingButton
      endIcon={<ContentCopy />}
      {...props}
      onClick={() => copy(text)}
    >
      {isCopied ? 'Copied!' : children}
    </LoadingButton>
  )
}

export default ButtonCopy
