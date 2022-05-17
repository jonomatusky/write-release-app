import React, { useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  DialogActions,
} from '@mui/material'
import { Upload, VideoFile } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'

import { useDropzone } from 'react-dropzone'

const DialogUploadVideo = ({ index, open, onClose, submit }) => {
  const File = () => {
    return (
      <Box padding={3} textAlign="center">
        <VideoFile fontSize="large" />
        <Typography>{name}</Typography>
      </Box>
    )
  }

  const storage = getStorage()

  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: 'video/mp4,video/quicktime',
  })

  let file = acceptedFiles[0]

  let { name } = file || {}

  const filepath = 'videos/' + uuid() + '.mp4'
  const storageRef = ref(storage, filepath)
  let uploadTaskRef = useRef()

  const removeAll = () => {
    acceptedFiles.length = 0
    acceptedFiles.splice(0, acceptedFiles.length)
    inputRef.current.value = ''
  }

  const handleUpload = async () => {
    setIsLoading(true)
    uploadTaskRef.current = uploadBytesResumable(storageRef, file)
    uploadTaskRef.current.on(
      'state_changed',
      snapshot => {
        setUploadProgress(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100, 0)
        )
      },
      error => {
        setIsLoading(false)
        console.log(error)
      },
      () => {
        setIsLoading(false)
        submit(filepath)
        removeAll()
        onClose()
      }
    )
  }

  const handleClose = () => {
    onClose()
    uploadTaskRef.current.cancel()
    removeAll()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Video</DialogTitle>
      <DialogContent>
        <Box width="100%" display="flex" overflow="hidden" flexWrap="none">
          <div
            {...getRootProps()}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <input {...getInputProps()} />
            <Box color="grey.700" height="100%">
              <Button
                color="inherit"
                // variant="outlined"
                sx={{
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  textTransform: 'none',
                  p: 7,
                  bgcolor: 'grey.100',
                  minHeight: '250px',
                }}
              >
                {isLoading ? (
                  <Box color="text.secondary">
                    <CircularProgress color="inherit" />
                    <Typography color="inherit" variant="subtitle2">
                      Uploading...{' '}
                      {uploadProgress > 0 ? uploadProgress + '%' : ''}
                    </Typography>
                  </Box>
                ) : name ? (
                  <File color="text.secondary" />
                ) : (
                  <Box>
                    <Upload color="text.secondary" sx={{ fontSize: 40 }} />
                    <Typography>Drop here or click to select</Typography>
                  </Box>
                )}
              </Button>
            </Box>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpload} variant="contained">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogUploadVideo
