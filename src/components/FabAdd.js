import React from 'react'
import { useLocation } from 'react-router-dom'
import { Fab } from '@mui/material'
import { Add, DomainAdd, PersonAdd } from '@mui/icons-material'

import DialogCreateCompany from '../pages/ViewCompanies/components/DialogCreateCompany'
import DialogCreateIndividual from 'pages/ViewProfiles/components/DialogCreateIndividual'

const FabAdd = ({ type }) => {
  const { hash } = useLocation()

  const open = hash === '#create'

  const handleClose = () => {
    window.location.hash = ''
  }

  return (
    <>
      {type === 'organization' && (
        <DialogCreateCompany open={open} onClose={handleClose} />
      )}
      {type === 'individual' && (
        <DialogCreateIndividual open={open} onClose={handleClose} />
      )}

      <Fab
        color="primary"
        sx={{ position: 'fixed', zIndex: '100', bottom: 24, right: 24 }}
        onClick={() => (window.location.hash = '#create')}
      >
        {type === 'organization' ? (
          <DomainAdd />
        ) : type === 'individual' ? (
          <PersonAdd />
        ) : (
          <Add />
        )}
      </Fab>
    </>
  )
}

export default FabAdd
