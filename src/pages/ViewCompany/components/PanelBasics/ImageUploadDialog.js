import React, { useCallback } from 'react'
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Upload } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import 'react-image-crop/dist/ReactCrop.css'

const ImageUploadDialog = ({ open, onClose, upload, isLoading }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        upload(file)
        // let imageSrc = URL.createObjectURL(file)

        // const img = new Image()

        // img.onload = function () {
        //   const height = this.height
        //   const width = this.width
        //   // you'll need the dimensions of the original image file in order to crop it
        //   setNewImage({ src: imageSrc, width, height })
        //   setIsLoading(false)
        //   onClose()
        // }

        // img.src = imageSrc
      })
    },
    [upload]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: 'image/jpeg, image/jpg, image/png',
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Change Profile Picture</DialogTitle>
      <DialogContent>
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
              }}
            >
              <Box>
                <Upload color="text.secondary" sx={{ fontSize: 40 }} />
                <Typography>Drop here or click to select</Typography>
              </Box>
            </Button>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          onClick={onClose}
          loading={isLoading}
        >
          Cancel
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ImageUploadDialog
