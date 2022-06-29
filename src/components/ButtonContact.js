import React from 'react'
import { Button } from '@mui/material'
import useInquiriesStore from 'hooks/store/use-inquiries-store'
import { Email } from '@mui/icons-material'

const ButtonContact = ({ id, type, label }) => {
  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: type,
      entityId: id,
    })
  }

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleContact}
      sx={{ borderRadius: 28, paddingLeft: 3, paddingRight: 3 }}
      endIcon={<Email />}
    >
      {label || 'Contact'}
    </Button>
  )
}

export default ButtonContact
