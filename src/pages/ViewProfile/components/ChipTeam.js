import React from 'react'
import { Chip } from '@mui/material'
import { GroupWork } from '@mui/icons-material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './DialogEditSettings'

const ChipTeam = ({ team }) => {
  return (
    <>
      <ButtonEditPanel
        dialog={DialogEditSettings}
        fontSize="3px"
        sx={{ visibility: 'hidden' }}
      />
      <Chip label={team} icon={<GroupWork />} color="secondary" />
      <ButtonEditPanel dialog={DialogEditSettings} fontSize="3px" />
    </>
  )
}

export default ChipTeam
