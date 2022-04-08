import React, { useState } from 'react'
import { IconButton, Popover } from '@mui/material'
import { FilterNone } from '@mui/icons-material'
import useCopy from 'hooks/use-copy'

const ButtonIconCopy = ({ text, ...props }) => {
  const { copy, isCopied } = useCopy()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const id = isCopied ? 'copy-popover' : undefined

  return (
    <>
      <Popover
        id={id}
        open={isCopied}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        Copied!
      </Popover>
      <IconButton {...props} onClick={copy}>
        <FilterNone fontSize="inherit" />
      </IconButton>
    </>
  )
}

export default ButtonIconCopy
