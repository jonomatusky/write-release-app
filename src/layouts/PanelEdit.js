import React from 'react'
import { Box } from '@mui/material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import Panel from './Panel'

const PanelEdit = ({ dialog, children }) => {
  return (
    <Panel>
      <Box position="relative">
        <Box position="absolute" zIndex="50" top="1px" right="1px">
          <ButtonEditPanel dialog={dialog} />
        </Box>
        {children}
      </Box>
    </Panel>
  )
}

export default PanelEdit
