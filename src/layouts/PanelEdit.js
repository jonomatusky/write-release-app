import React from 'react'
import { Box } from '@mui/material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import Panel from './Panel'

const PanelEdit = ({ dialog, dialogProps, children, icon }) => {
  return (
    <Panel>
      <Box position="relative">
        <Box position="absolute" zIndex="50" top="2px" right="2px">
          <ButtonEditPanel
            dialog={dialog}
            dialogProps={dialogProps}
            icon={icon}
          />
        </Box>
        {children}
      </Box>
    </Panel>
  )
}

export default PanelEdit
