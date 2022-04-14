import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const ImageCropDialog = ({ open, onClose, image, upload }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [crop, setCrop] = useState()

  const handleCropChange = (crop, percentCrop) => setCrop(percentCrop)

  const cropImage = () => {
    let dimension = 400

    let width = Math.round((image.width * crop.width) / 100)
    let height = Math.round((image.height * crop.height) / 100)
    let x = Math.round((image.width * crop.x) / 100)
    let y = Math.round((image.height * crop.y) / 100)

    return new Promise((resolve, reject) => {
      var img = new Image()

      const canvas = document.createElement('canvas')

      canvas.width = dimension
      canvas.height = dimension

      var ctx = canvas.getContext('2d')

      img.onload = () => {
        ctx.drawImage(img, x, y, width, height, 0, 0, dimension, dimension)

        ctx.canvas.toBlob(
          blob => {
            resolve(blob)
          },
          'image/jpeg',
          0.92
        )
      }
      img.onerror = () => {
        reject('error cropping image')
      }
      img.src = image.src
    })
  }

  const handleSetImage = async () => {
    setIsLoading(true)
    let blob = await cropImage()

    await upload(blob)
    setIsLoading(false)
    onClose()
  }

  const onImageLoad = e => {
    const { width, height } = e.currentTarget

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: '%',
          width: width > height ? null : 100,
          height: width > height ? 100 : null,
        },
        1,
        width,
        height
      ),
      width,
      height
    )

    setCrop(crop)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Change Profile Picture</DialogTitle>
      <DialogContent>
        <Box flexGrow={1}>
          <Box width="100%">
            <Box
              // height="360px"
              // width="440px"
              backgroundColor="#00000010"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ReactCrop
                aspect={1}
                crop={crop}
                onChange={handleCropChange}
                circularCrop
                ruleOfThirds
              >
                <img src={image.src} alt="avatar" onLoad={onImageLoad} />
              </ReactCrop>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSetImage}
          loading={isLoading}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ImageCropDialog
