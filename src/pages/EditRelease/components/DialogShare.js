import React from 'react'
import { Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import ButtonCopy from 'components/ButtonCopy'
import { Download } from '@mui/icons-material'

const DialogShare = ({ id, content, open, onClose }) => {
  const releaseText = (content.title || '') + '\n\n' + (content.text || '')

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([releaseText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'release.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
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
            text={releaseText}
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
          >
            Download
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
