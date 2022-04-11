import React from 'react'
import { Chip } from '@mui/material'
import { GroupWork } from '@mui/icons-material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './DialogEditSettings'

const ChipTeam = ({ team }) => {
  return (
    <>
      <ButtonEditPanel
        sx={{ ml: 0.5, visibility: 'hidden' }}
        fontSize="3px"
        dialog={DialogEditSettings}
      />
      <Chip label={team} icon={<GroupWork />} color="secondary" />
      <ButtonEditPanel
        sx={{ ml: 0.5 }}
        fontSize="3px"
        dialog={DialogEditSettings}
      />
    </>
  )
}

export default ChipTeam
