import React, { useState } from 'react'
import { Fab } from '@mui/material'
import { DomainAdd } from '@mui/icons-material'

import DialogCreateCompany from './DialogCreateCompany'

const ButtonAddCompany = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogCreateCompany open={open} onClose={() => setOpen(false)} />
      <Fab
        color="primary"
        sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
        onClick={() => setOpen(true)}
      >
        <DomainAdd />
      </Fab>
    </>
  )
}

export default ButtonAddCompany
