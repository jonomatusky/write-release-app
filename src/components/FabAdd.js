import React from 'react'
import { useLocation } from 'react-router-dom'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

const FabAdd = ({ Icon, Dialog }) => {
  const { hash } = useLocation()

  const open = hash === '#create'

  const handleClose = () => {
    window.location.hash = ''
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} />
      <Fab
        color="primary"
        sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
        onClick={() => (window.location.hash = '#create')}
      >
        {!!Icon ? <Icon /> : <Add />}
      </Fab>
    </>
  )
}

export default FabAdd
