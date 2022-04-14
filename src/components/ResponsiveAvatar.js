import React, { useEffect, useRef } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import useIndividualStore from 'hooks/store/use-individuals-store'

const ResponsiveAvatar = ({ id }) => {
  const { select } = useIndividualStore()
  const individual = select(id) || {}
  const { avatar, avatarUrl } = individual

  const isCancelled = useRef(false)
  const { setAvatar } = useIndividualStore()

  useEffect(() => {
    const getImage = async () => {
      if (avatar) {
        try {
          let url
          if (!isCancelled.current) {
            const storage = getStorage()
            const storageRef = ref(storage, avatar)
            url = await getDownloadURL(storageRef)
          }
          if (!isCancelled.current) {
            setAvatar({ id, avatarUrl: url })
          }
        } catch (err) {
          console.log(err)
        }
      }

      return () => (isCancelled.current = true)
    }
    getImage()
  }, [avatar, id, setAvatar])

  return (
    <Box
      width="100%"
      position="relative"
      sx={{
        '&:after': { content: '""', display: 'block', paddingBottom: '100%' },
      }}
    >
      {avatarUrl ? (
        <Box
          width="100%"
          height="100%"
          position="absolute"
          borderRadius="50%"
          sx={{
            backgroundImage: `url(${avatarUrl})`,
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
