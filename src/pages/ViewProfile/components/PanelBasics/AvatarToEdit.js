import React, { useState } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { Grid, IconButton, Box, Button } from '@mui/material'
import ResponsiveAvatar from 'components/ResponsiveAvatar'
import ImageUploadDialog from './ImageUploadDialog'
import ImageCropDialog from './ImageCropDialog'

const AvatarToEdit = ({ id, updateImage }) => {
  const [uploadIsOpen, setUploadIsOpen] = useState(false)
  const [cropIsOpen, setCropIsOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState({})

  const storage = getStorage()

  const handleOpenUploadDialog = () => {
    setUploadIsOpen(true)
    setImageToCrop({})
  }

  const handleCloseUploadDialog = () => {
    setUploadIsOpen(false)
  }

  const handleSetImageToCrop = image => {
    setImageToCrop(image)
    setCropIsOpen(true)
    setUploadIsOpen(false)
  }

  const handleCloseCrop = () => {
    setCropIsOpen(false)
  }

  const handleUploadImage = async image => {
    const filepath = 'images/avatars/' + uuid() + '.jpeg'
    const storageRef = ref(storage, filepath)

    try {
      await uploadBytes(storageRef, image)
      updateImage(filepath)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ImageUploadDialog
        open={uploadIsOpen}
        setNewImage={handleSetImageToCrop}
        onClose={handleCloseUploadDialog}
      />
      <ImageCropDialog
        image={imageToCrop}
        open={cropIsOpen}
        onClose={handleCloseCrop}
        upload={handleUploadImage}
      />
      <Grid item xs={12} textAlign="center" container>
        <Grid item xs={12}>
          <IconButton onClick={handleOpenUploadDialog}>
            <Box width="125px" height="125px" position="relative">
              <ResponsiveAvatar id={id} />
            </Box>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={handleOpenUploadDialog}
          >
            Change Profile Picture
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default AvatarToEdit
