import React, { useState } from 'react'
import { Grid, Box, Typography, Paper, IconButton } from '@mui/material'

import useResourcesStore from 'hooks/store/use-resources-store'
import { Delete, Edit } from '@mui/icons-material'
import DialogResourceUpdate from './DialogResourceUpdate'

const ResourceItem = ({ id }) => {
  const { remove, removeStatus, select } = useResourcesStore()

  const resource = select(id)

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleOpen = () => {
    setAddDialogIsOpen(true)
  }

  const handleDelete = () => {
    remove(id)
  }

  return (
    <>
      <DialogResourceUpdate
        open={addDialogIsOpen}
        onClose={() => setAddDialogIsOpen(false)}
        id={id}
      />
      <Grid item xs={12}>
        <Paper variant="outlined">
          <Box
            p={2}
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography>
                <b>{resource.type}</b>
              </Typography>
            </Box>
            <Box>
              <IconButton
                size="small"
                onClick={handleOpen}
                disabled={removeStatus === 'loading'}
              >
                <Edit />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDelete}
                disabled={removeStatus === 'loading'}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  )
}

export default ResourceItem
