import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { ContentCopy, DeleteForever } from '@mui/icons-material'
import DialogDeleteContent from './DialogDeleteContent'
import DialogCopyContent from './DialogCopyContent'
import ButtonGoogleDoc from './ButtonGoogleDoc'

const MenuContent = ({ id, onUpdate }) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [copyIsOpen, setCopyIsOpen] = useState(false)

  const handleCopyOpen = () => {
    setCopyIsOpen(true)
  }

  const handleDeleteOpen = () => {
    setDeleteIsOpen(true)
  }

  return (
    <>
      <DialogCopyContent
        id={id}
        open={copyIsOpen}
        onClose={() => setCopyIsOpen(false)}
        onUpdate={onUpdate}
      />
      <DialogDeleteContent
        id={id}
        open={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
      />
      <Box pr={1}>
        <Button
          onClick={handleCopyOpen}
          variant="contained"
          size="large"
          sx={{ minWidth: 0, pr: '8px', pl: '8px' }}
          disableElevation
        >
          <ContentCopy sx={{ fontSize: 20 }} />
        </Button>
      </Box>
      <Box pr={1}>
        <Button
          onClick={handleDeleteOpen}
          variant="contained"
          size="large"
          sx={{ minWidth: 0, pr: '8px', pl: '8px' }}
          disableElevation
        >
          <DeleteForever sx={{ fontSize: 20 }} />
        </Button>
      </Box>
      <ButtonGoogleDoc id={id} onUpdate={onUpdate} />
    </>
  )
}

export default MenuContent
