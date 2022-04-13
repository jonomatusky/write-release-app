import React, { useState } from 'react'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'

import DialogCreateIndividual from './DialogCreateIndividual'

const ButtonAddIndividual = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogCreateIndividual open={open} onClose={() => setOpen(false)} />
      <Fab
        color="primary"
        sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
        onClick={() => setOpen(true)}
      >
        <Add />
      </Fab>
    </>
  )
}

export default ButtonAddIndividual
