import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import ButtonCopy from 'components/ButtonCopy'
import { Delete, Download } from '@mui/icons-material'
import useContentStore from 'hooks/store/use-content-store'
import { useNavigate } from 'react-router'

const DialogShare = ({ id, text, open, onClose }) => {
  const navigate = useNavigate()
  const { remove } = useContentStore()

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'release.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await remove(id)
    } catch (error) {}
    navigate('/')
    return () => setIsDeleting(false)
  }

  return (
    <LayoutDialogEdit
      open={open}
      title="Share Release"
      maxWidth="xs"
      onClose={onClose}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonCopy
            fullWidth
            variant="contained"
            size="large"
            text={text}
            disabled={!text || isDeleting}
          >
            Copy to Clipboard
          </ButtonCopy>
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            onClick={handleDownload}
            endIcon={<Download />}
            disabled={!text || isDeleting}
          >
            Download
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleDelete}
            endIcon={<Delete />}
            loading={isDeleting}
          >
            Delete
          </LoadingButton>
        </Grid>
        {/* <Grid item xs={12}>
          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            onClick={handleDownload}
            endIcon={<Email />}
          >
            Send to Email
          </LoadingButton>
        </Grid> */}
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogShare
