import React, { useState } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { Grid, Button, Box } from '@mui/material'
import ImageUploadDialog from 'components/DialogImageUploadNoCrop'
import ResponsiveLogo from 'components/ResponsiveLogo'

const LogoToEdit = ({ src, updateImage }) => {
  const [uploadIsOpen, setUploadIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const storage = getStorage()

  const handleOpenUploadDialog = () => {
    setUploadIsOpen(true)
  }

  const handleCloseUploadDialog = () => {
    setUploadIsOpen(false)
  }

  const handleUploadImage = async image => {
    setIsLoading(true)
    const filepath = 'images/logos/' + uuid() + '.jpeg'
    const storageRef = ref(storage, filepath)

    try {
      await uploadBytes(storageRef, image)
      await updateImage(filepath)
      handleCloseUploadDialog()
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  return (
    <>
      <ImageUploadDialog
        open={uploadIsOpen}
        isLoading={isLoading}
        onClose={handleCloseUploadDialog}
        upload={handleUploadImage}
      />

      <Grid item xs={12} textAlign="center" container>
        <Grid item xs={12}>
          <Button onClick={handleOpenUploadDialog}>
            <Box width="125px" height="75px" position="relative">
              <ResponsiveLogo src={src} />
            </Box>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={handleOpenUploadDialog}
          >
            Change Logo
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default LogoToEdit
