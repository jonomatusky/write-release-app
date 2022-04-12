import React from 'react'
import { Box, Chip } from '@mui/material'
import { GroupWork, Settings } from '@mui/icons-material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './DialogEditSettings'

const ChipTeam = ({ team }) => {
  return (
    <Box color="grey.500">
      <Chip
        label={team}
        icon={<GroupWork fontSize="small" />}
        // color="inherit"
      />
      <ButtonEditPanel
        icon={Settings}
        sx={{ ml: 0.5 }}
        size="medium"
        // fontSize="3px"
        dialog={DialogEditSettings}
      />
    </Box>
  )
}

export default ChipTeam
