import React, { useState } from 'react'
import { IosShare, Task, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import useAlertStore from 'hooks/store/use-alert-store'
import useContentStore from 'hooks/store/use-content-store'
import useRequest from 'hooks/use-request'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import { Box } from '@mui/system'

const ButtonGoogleDoc = ({ id, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { select, get } = useContentStore()
  const { setError } = useAlertStore()
  const content = select(id)
  const { draftUrl, title } = content
  const { request } = useRequest()

  const [status, setStatus] = useState(false)

  const [showSuccessScreen, setShowSuccessScreen] = useState(!!draftUrl)

  const handleOpen = () => {
    if (!!draftUrl) {
      return window.open(draftUrl, '_blank')
    }

    setIsOpen(true)
  }

  const handleClick = async () => {
    setStatus('loading')

    try {
      await onUpdate()

      await get(id)

      if (!!draftUrl) {
        window.open(draftUrl, '_blank')
      } else if (!title) {
        setError({ message: 'Please add a title before creating a draft' })
        setStatus('idle')
      } else {
        await request({
          url: '/google-doc',
          method: 'post',
          data: { id },
        })

        const timer = setTimeout(async () => {
          await get(id)

          if (!!draftUrl) {
          }

          setStatus('succeeded')
          setIsOpen(false)
          setShowSuccessScreen(true)
        }, 10000)

        return () => clearTimeout(timer)
      }
    } catch (err) {
      console.log(err)
      setStatus('idle')
    }
  }

  const handleCloseSuccessScreen = () => {
    setShowSuccessScreen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpenGoogleDoc = async () => {
    if (!!draftUrl) {
      return window.open(draftUrl, '_blank')
    }

    try {
      await get(id)
    } catch (err) {
      console.log(err)
    }

    if (!!draftUrl) {
      window.open(draftUrl, '_blank')
    } else {
      setError({
        message:
          'Unable to open Google Doc. Please refresh the page and try again.',
      })
    }
  }

  return (
    <>
      <Dialog open={showSuccessScreen} onClose={handleCloseSuccessScreen}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Task color="primary" />
            <Box pl={1}>Exported to Google Docs</Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            {status === 'succeeded'
              ? `Your story has been successfully exported to Google Docs.`
              : `This story has been exported to Google Docs. Any changes made here
            will not be synced. Please open the Doc to continue editing.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseSuccessScreen}
            variant="outlined"
            disabled={status === 'loading'}
          >
            Close
          </Button>
          <LoadingButton
            onClick={handleOpenGoogleDoc}
            startIcon={<Visibility />}
            variant="contained"
            loading={status === 'loading'}
          >
            View Google Doc
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {status === 'loading' ? 'Exporting...' : 'Export to Google Docs?'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {status === 'loading'
              ? `Exporting to Google Docs. Feel free to close this window. We'll let you know once your document is ready.`
              : `Once you export, this story will be permanently linked to the Google Doc, and any changes made here will not be synced. Only export when you're ready.`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={status === 'loading'}
          >
            {status === 'succeeded' ? 'Close' : 'Cancel'}
          </Button>
          <LoadingButton
            onClick={handleClick}
            endIcon={<IosShare />}
            variant="contained"
            loading={status === 'loading'}
          >
            Export
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <LoadingButton
        endIcon={
          !!draftUrl ? (
            <Visibility sx={{ fontSize: 20 }} />
          ) : (
            <IosShare sx={{ fontSize: 20 }} />
          )
        }
        variant="contained"
        onClick={handleOpen}
        disableElevation
        loading={status === 'loading'}
      >
        {!!draftUrl ? 'View Doc' : 'Export to Docs'}
      </LoadingButton>
    </>
  )
}

export default ButtonGoogleDoc
