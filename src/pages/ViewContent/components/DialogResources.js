import React, { useState } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useResourcesStore from 'hooks/store/use-resources-store'
import DialogResourceUpdate from './DialogResourceUpdate'
import ResourceItem from './ResourceItem'

const DialogResources = ({ open, onClose, id }) => {
  const {
    update: updateContent,
    updateStatus: updateContentStatus,
    select: selectContent,
  } = useContentStore()
  const { select: selectContentType } = useContentTypesStore()
  const { items: resources } = useResourcesStore()

  const content = !!id ? selectContent(id) : {}

  const setupStage = !!id ? content.setupStage : null
  const isSetup = setupStage === 'resources'

  const handleClose = async () => {
    if (isSetup && !!id) {
      let contentType = selectContentType(content.type)

      await updateContent({
        id,
        setupStage:
          contentType.secondary === 'New Hire' ||
          contentType.secondary === 'Board Appointment'
            ? 'hiring'
            : 'subject',
      })
    }
    onClose()
  }

  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)

  const handleOpen = id => {
    setAddDialogIsOpen(true)
  }

  const handleCloseAddDialog = async () => {
    setAddDialogIsOpen(false)
  }

  return (
    <>
      <DialogResourceUpdate
        open={addDialogIsOpen}
        onClose={handleCloseAddDialog}
        contentId={id}
      />
      <LayoutDialogEdit
        title={
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box>Resources</Box>
          </Box>
        }
        open={open || isSetup}
        onClose={handleClose}
        loading={updateContentStatus === 'loading'}
        cancelLabel={isSetup ? 'Next' : 'Done'}
      >
        <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
          <Grid item xs={12}>
            <Typography>
              Add any key resources below, like meeting notes, emails, or
              transcripts.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleOpen}
              size="large"
            >
              Add Resource +
            </Button>
          </Grid>
          {resources.map(resource => (
            <ResourceItem id={resource.id} key={resource.id} />
          ))}
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogResources
