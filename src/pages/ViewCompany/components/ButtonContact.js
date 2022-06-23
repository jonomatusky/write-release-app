import React from 'react'
import { Fab } from '@mui/material'
import { Send } from '@mui/icons-material'

import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useInquiriesStore from 'hooks/store/use-inquiries-store'

const ButtonContact = ({ id }) => {
  const { select } = useOrganizationsStore()
  const organization = select(id)

  const { email } = organization || {}

  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: 'organization',
      entityId: id,
    })
  }

  return (
    <>
      {email && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
          onClick={handleContact}
          variant="extended"
        >
          Book Now
          <Send sx={{ ml: 1 }} />
        </Fab>
      )}
    </>
  )
}

export default ButtonContact
