import React from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { OpenInNew } from '@mui/icons-material'
import noImage from 'assets/images/no-image.jpeg'

const LinkPreview = ({ url, title, outlet, image }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea href={url} target="_blank">
        <CardMedia
          component="img"
          height="200"
          image={image || noImage}
          alt={title}
        />
        <CardContent>
          <Box height="60px" overflow="hidden">
            <Typography
              component="h5"
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

          <Box display="flex" alignItems="center" pt={0.5}>
            <Typography variant="body2">{outlet}</Typography>
            <OpenInNew fontSize="inherit" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default LinkPreview
