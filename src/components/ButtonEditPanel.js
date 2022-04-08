import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

import useSession from 'hooks/use-session'

const ButtonEditPanel = ({ dialog, ...props }) => {
  const { user } = useSession()
  const [editIsOpen, setEditIsOpen] = useState(false)
  const handleOpen = () => setEditIsOpen(true)
  const handleClose = () => setEditIsOpen(false)

  const Dialog = dialog || null

  return !!user ? (
    <>
      {dialog && <Dialog open={editIsOpen} onClose={handleClose} />}

      <IconButton
        variant="contained"
        size="small"
        onClick={handleOpen}
        {...props}
      >
        <Edit fontSize="inherit" />
      </IconButton>
    </>
  ) : (
    <></>
  )
}

export default ButtonEditPanel
