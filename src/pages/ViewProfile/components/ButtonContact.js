import React from 'react'
import { Fab } from '@mui/material'
import { Send } from '@mui/icons-material'

import useIndividualsStore from 'hooks/store/use-individuals-store'

const ButtonContact = ({ id }) => {
  const { select } = useIndividualsStore()
  const individual = select(id)

  const { email, name } = individual || {}

  return (
    <>
      {email && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
          href={'mailto:' + email + '?subject=Contacting ' + name}
          target="_blank"
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
