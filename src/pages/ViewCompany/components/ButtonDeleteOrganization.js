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
import useOrganizationStore from 'hooks/store/use-organizations-store'
import { LoadingButton } from '@mui/lab'
import useIndividualsStore from 'hooks/store/use-individuals-store'

const ButtonDeleteOrganization = ({ id }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { update, updateStatus } = useOrganizationStore()
  const { items } = useIndividualsStore()

  const individuals = items.filter(individual => individual.organization === id)

  const handleDelete = async () => {
    try {
      for (let i = 0; i < individuals.length; i++) {
        await update({ id: individuals[i].id, isRemoved: true })
      }
      await update({ id, isRemoved: true })
      navigate('/companies')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Delete Organization</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this organization? This will also
            remove all individuals associated with this organization. This
            action cannot be undone.
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
        Delete Organization
      </Button>
    </>
  )
}

export default ButtonDeleteOrganization
