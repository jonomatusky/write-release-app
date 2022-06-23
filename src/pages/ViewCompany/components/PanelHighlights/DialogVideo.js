import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import { OpenInNew } from '@mui/icons-material'
import ReactPlayer from 'react-player'

const DialogVideo = ({
  open,
  onClose,
  title,
  outlet,
  mediaLink,
  videoFileUrl,
  url,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = () => {
    setIsLoading(true)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{`${title}${!!outlet ? ' | ' + outlet : ''}`}</DialogTitle>
      <DialogContent>
        <Box position="relative" pt="56.25%">
          <ReactPlayer
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: isLoading ? 'none' : 'block',
            }}
            width="100%"
            height="100%"
            url={videoFileUrl ? videoFileUrl : mediaLink}
            preload={'auto'}
            onReady={() => setIsLoading(false)}
            controls
          />
          {!!isLoading && (
            <Box
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              textAlign="center"
              top={0}
              left={0}
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {!!url && (
          <Button
            href={url}
            target="_blank"
            endIcon={<OpenInNew />}
            variant="outlined"
          >
            Open
          </Button>
        )}
        <Box pl={1}>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default DialogVideo
