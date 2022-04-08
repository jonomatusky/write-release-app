import React, { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Box } from '@mui/material'

const ResponsiveAvatar = ({ image, ...props }) => {
  const [imageUrl, setImageUrl] = useState(null)

  const storage = getStorage()

  const storageRef = ref(storage, image)

  useEffect(() => {
    const getImage = async () => {
      if (image) {
        try {
          const url = await getDownloadURL(storageRef)
          setImageUrl(url)
        } catch (err) {
          console.log(err)
        }
      }
    }
    getImage()
  })

  return (
    <Box
      width="100%"
      position="relative"
      sx={{
        '&:after': { content: '""', display: 'block', paddingBottom: '100%' },
      }}
    >
      <Box
        width="100%"
        height="100%"
        position="absolute"
        borderRadius="50%"
        sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Box>
  )
}

export default ResponsiveAvatar
