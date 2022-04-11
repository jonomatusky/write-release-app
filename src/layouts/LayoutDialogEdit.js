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
import { Close, DeleteOutline } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const LayoutDialogEdit = ({
  title,
  open,
  onClose,
  onSave,
  onRemove,
  loading,
  children,
}) => {
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
        <Box display="flex" width="100%" justifyContent="flex-start">
          <Box flexGrow={1}>
            {!!onRemove && (
              <Button
                variant="outlined"
                onClick={onRemove}
                size="large"
                startIcon={<DeleteOutline />}
              >
                Remove
              </Button>
            )}
          </Box>
          <Box flexGrow={0}>
            <Button variant="outlined" onClick={onClose} size="large">
              Cancel
            </Button>
          </Box>
          <Box flexGrow={0} pl={1}>
            <LoadingButton
              variant="contained"
              onClick={onSave}
              size="large"
              loading={loading}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default LayoutDialogEdit
