import React, { useCallback, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import useIndividualStore from 'hooks/store/use-individuals-store'

const ResponsiveAvatar = ({ id }) => {
  const { select } = useIndividualStore()
  const individual = select(id)
  const { avatar, avatarUrl } = individual || {}

  const { setAvatar } = useIndividualStore()

  const getUrl = useCallback(
    async a => {
      if (a) {
        try {
          let url
          const storage = getStorage()
          const storageRef = ref(storage, a)
          url = await getDownloadURL(storageRef)

          setAvatar({ id, avatarUrl: url })
        } catch (err) {
          console.log(err)
        }
      }
    },
    [id, setAvatar]
  )

  useEffect(() => {
    getUrl(avatar)
  }, [avatar, getUrl])

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
