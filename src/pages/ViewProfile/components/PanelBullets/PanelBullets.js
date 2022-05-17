import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import useSession from 'hooks/use-session'
import PanelEdit from 'layouts/PanelEdit'
import DialogEditBullets from './DialogEditBullets'

const PanelBullets = ({ title, field, bullets, placeholders }) => {
  const { user } = useSession()

  const dialogTitle = 'Edit ' + title

  const showPanel = !!bullets

  return (
    <>
      {(!!user || showPanel) && (
        <PanelEdit
          dialog={DialogEditBullets}
          dialogProps={{
            title: dialogTitle,
            field,
            placeholders: placeholders,
          }}
        >
          <Box p={2} pt={1}>
            <Box pb={1}>
              <Typography color="primary">
                <b>{title}</b>
              </Typography>
            </Box>
            <Box width="100%">
              <List dense disablePadding>
                {bullets.map((bullet, index) => (
                  <ListItem
                    // sx={{ display: 'listItem' }}
                    dense
                    key={bullet.id}
                    disablePadding
                  >
                    <ListItemIcon sx={{ minWidth: '24px' }}>•</ListItemIcon>
                    <ListItemText primary={bullet.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </PanelEdit>
      )}
    </>
  )
}

export default PanelBullets
