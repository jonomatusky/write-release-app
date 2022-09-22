import React, { useState } from 'react'
import { Box, Collapse, Fab } from '@mui/material'
import { Email } from '@mui/icons-material'

import useInquiriesStore from 'hooks/store/use-inquiries-store'

const FabContact = ({ id, type, label }) => {
  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: type,
      entityId: id,
    })
  }
  const [show, setShow] = useState(false)

  return (
    <Box
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      sx={{
        position: 'fixed',
        zIndex: '100',
        bottom: 24,
        right: 24,
      }}
    >
      <Fab
        size="large"
        color="primary"
        sx={{
          pr: 1.5,
          pl: 1.5,
          // maxWidth: show ? null : '48px',
        }}
        onClick={handleContact}
        alt="Contect"
        variant="extended"
      >
        <Collapse orientation="horizontal" in={show}>
          <Box overflow="hidden" sx={{ mr: 1, pl: 0.5 }} whiteSpace="nowrap">
            {label || 'Contact'}
          </Box>
        </Collapse>
        <Email />
      </Fab>
    </Box>
  )
}

export default FabContact
