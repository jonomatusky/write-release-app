import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import LinkPreview from './LinkPreview'
import ButtonEditHighlight from './ButtonEditHighlight'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const Highlight = ({ highlight }) => {
  const { url, image, title, outlet, mediaFile, mediaLink } = highlight

  const [videoFileUrl, setVideoFileUrl] = useState(null)

  useEffect(() => {
    const fetchVideoFileUrl = async () => {
      const storage = getStorage()
      const storageRef = ref(storage, mediaFile)
      let url = await getDownloadURL(storageRef)
      setVideoFileUrl(url)
    }
    if (!!mediaFile) {
      fetchVideoFileUrl()
    } else {
      setVideoFileUrl(null)
    }
  }, [mediaFile])

  const coverageItem = { ...highlight, videoFileUrl }

  return (
    <Box position="relative">
      <Box position="absolute" zIndex="50" top="3px" right="3px">
        <ButtonEditHighlight highlight={coverageItem} />
      </Box>
      <LinkPreview
        url={url}
        image={image}
        title={title}
        outlet={outlet}
        mediaLink={mediaLink}
        videoFileUrl={videoFileUrl}
      />
    </Box>
  )
}

export default Highlight
