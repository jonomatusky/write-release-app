import React, { useState } from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { OpenInNew, PlayCircle } from '@mui/icons-material'
import noImage from 'assets/images/no-image.jpeg'
import DialogVideo from './DialogVideo'

const LinkPreview = ({
  url,
  title,
  outlet,
  image,
  mediaLink,
  videoFileUrl,
}) => {
  const [openVideoDialog, setOpenVideoDialog] = useState(false)

  const isVideo = !!videoFileUrl || !!mediaLink

  const handleClick = () => {
    if (isVideo) {
      setOpenVideoDialog(true)
    }
  }

  const VideoPreview = ({ url }) => {
    return (
      <Box
        height="150px"
        width="100%"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <video
          // style={{
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          // }}
          height="100%"
          minWidth="100%"
          preload={'auto'}
          controls={false}
          // playing={false}
          src={url}
        />
      </Box>
    )
  }

  return (
    <>
      <DialogVideo
        title={title}
        outlet={outlet}
        url={url}
        mediaLink={mediaLink}
        videoFileUrl={videoFileUrl}
        open={openVideoDialog}
        onClose={() => setOpenVideoDialog(false)}
      />
      <Card variant="outlined" sx={{ height: '100%' }}>
        <CardActionArea
          href={isVideo ? null : url}
          target="_blank"
          onClick={handleClick}
        >
          <CardMedia
            component={
              image ? 'img' : videoFileUrl || mediaLink ? VideoPreview : 'img'
            }
            height="150px"
            width="100%"
            image={!!image ? image : videoFileUrl || mediaLink ? null : noImage}
            url={videoFileUrl ? videoFileUrl : mediaLink}
            alt={title}
          />
          <CardContent>
            <Box height="60px" overflow="hidden">
              <Typography
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                <b>{title}</b>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" minHeight="20px">
              <Typography variant="body2">{outlet}</Typography>
              <Box pl={0.5} display="flex" alignItems="center">
                {mediaLink || videoFileUrl ? (
                  <PlayCircle fontSize="inherit" />
                ) : (
                  <OpenInNew fontSize="inherit" />
                )}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default LinkPreview
