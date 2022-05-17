import React from 'react'
import { Fab } from '@mui/material'
import { Email } from '@mui/icons-material'

import useIndividualsStore from 'hooks/store/use-individuals-store'

const ButtonContact = ({ id }) => {
  const { select } = useIndividualsStore()
  const individual = select(id)

  const { email, name } = individual || {}

  return (
    <>
      <Fab
        color="primary"
        sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
        href={'mailto:' + email + '?subject=Contacting ' + name}
        target="_blank"
        variant="extended"
      >
        <Email sx={{ mr: 1 }} />
        Contact
      </Fab>
    </>
  )
}

export default ButtonContact
