import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
} from '@mui/material'
import { Cancel, Close } from '@mui/icons-material'

const LayoutDialogEdit = ({ title, open, onClose, onSave, children }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign="center">
        <Box position="relative" maxHeight="100%">
          <Box position="absolute" zIndex="50" top="-3px" right="-10px">
            <IconButton onClick={onClose}>
              <Close fontSize="medium" />
            </IconButton>
          </Box>
          {title}
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box overflow="scroll">{children}</Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="outlined" onClick={onClose} size="large">
          Cancel
        </Button>
        <Button variant="contained" onClick={onSave} size="large">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LayoutDialogEdit
