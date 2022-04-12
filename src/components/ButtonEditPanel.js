import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

import useSession from 'hooks/use-session'
import useIndividualsStore from 'hooks/store/use-individuals-store'

const ButtonEditPanel = ({ dialog, icon, variant, ...props }) => {
  const { user } = useSession()
  const { fetchStatus } = useIndividualsStore()
  const [editIsOpen, setEditIsOpen] = useState(false)
  const handleOpen = () => setEditIsOpen(true)
  const handleClose = () => setEditIsOpen(false)

  const Dialog = dialog || null
  const Icon = icon || Edit

  return !!user && fetchStatus === 'succeeded' ? (
    <>
      {dialog && <Dialog open={editIsOpen} onClose={handleClose} />}

      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{
          backgroundColor: 'grey.200',
          '&:hover, &.Mui-focusVisible': { backgroundColor: 'grey.200' },
        }}
        {...props}
      >
        <Icon fontSize="inherit" />
      </IconButton>
    </>
  ) : (
    <></>
  )
}

export default ButtonEditPanel
