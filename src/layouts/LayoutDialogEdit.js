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
import { ArrowBackIos, Close, DeleteOutline } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

const LayoutDialogEdit = ({
  title,
  open,
  onClose,
  onSave,
  onRemove,
  onBack,
  loading,
  children,
  noScroll,
  label,
  cancelLabel,
  maxWidth,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth || 'sm'}
      transitionDuration={{ appear: 250, exit: 0 }}
    >
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
        <Box
          overflow={noScroll ? null : 'scroll'}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </Box>
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
                Delete
              </Button>
            )}
            {!!onBack && (
              <Button
                onClick={onBack}
                size="large"
                startIcon={<ArrowBackIos />}
              >
                Back
              </Button>
            )}
          </Box>
          <Box flexGrow={0}>
            <Button
              variant={!!onSave ? 'outlined' : 'contained'}
              onClick={onClose}
              size="large"
            >
              {!!cancelLabel ? cancelLabel : !!onSave ? 'Cancel' : 'Close'}
            </Button>
          </Box>
          {!!onSave && (
            <Box flexGrow={0} pl={1}>
              <LoadingButton
                variant="contained"
                onClick={onSave}
                size="large"
                loading={loading}
              >
                {label || 'Save'}
              </LoadingButton>
            </Box>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default LayoutDialogEdit
