import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DeleteForever } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import useContentStore from 'hooks/store/use-content-store'
import useAlertStore from 'hooks/store/use-alert-store'

const DialogDeleteContent = ({ id, open, onClose }) => {
  const navigate = useNavigate()
  const { update, updateStatus } = useContentStore()
  const { setMessage } = useAlertStore()

  const handleDelete = async () => {
    try {
      await update({ id, isRemoved: true })
      navigate('/stories')
      setMessage({ message: 'The content has been deleted' })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Content</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this piece? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={handleDelete}
          endIcon={<DeleteForever />}
          variant="outlined"
          loading={updateStatus === 'loading'}
        >
          Yes, Delete
        </LoadingButton>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDeleteContent
