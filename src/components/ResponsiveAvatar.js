import React, { useState, useEffect, useRef } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const ResponsiveAvatar = ({ image, ...props }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const isCancelled = useRef(false)

  useEffect(() => {
    const getImage = async () => {
      if (image) {
        try {
          let url
          if (!isCancelled.current) {
            const storage = getStorage()
            const storageRef = ref(storage, image)
            url = await getDownloadURL(storageRef)
          }
          if (!isCancelled.current) {
            setImageUrl(url)
          }
        } catch (err) {
          console.log(err)
        }
      }

      return () => (isCancelled.current = true)
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
      {imageUrl ? (
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
      ) : (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          borderRadius="50%"
          color="grey.300"
          sx={{
            backgroundColor: 'grey.100',
          }}
        >
          <AccountCircle
            color="inherit"
            sx={{ width: '100%', height: '100%' }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ResponsiveAvatar
