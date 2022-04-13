import React, { useState } from 'react'
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
import useIndividualStore from 'hooks/store/use-individuals-store'
import { LoadingButton } from '@mui/lab'

const ButtonDeleteIndividual = ({ id }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { update, updateStatus } = useIndividualStore()

  const handleDelete = async () => {
    try {
      await update({ id, isRemoved: true })
      navigate('/profiles')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Delete Profile</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this profile? This action cannot be
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
          <Button onClick={() => setOpen(false)} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        color="warning"
        endIcon={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Delete Profile
      </Button>
    </>
  )
}

export default ButtonDeleteIndividual
