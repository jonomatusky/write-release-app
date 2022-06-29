import React from 'react'
import { Fab } from '@mui/material'
import { Send } from '@mui/icons-material'

import useInquiriesStore from 'hooks/store/use-inquiries-store'

const FabContact = ({ id, type, label }) => {
  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: type,
      entityId: id,
    })
  }

  return (
    <Fab
      color="primary"
      sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
      onClick={handleContact}
      variant="extended"
    >
      {label || 'Contact'}
      <Send sx={{ ml: 1 }} />
    </Fab>
  )
}

export default FabContact
