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

const LinkPreview = ({ url, title, outlet, image }) => {
  return (
    <Card variant="outlined">
      <CardActionArea href={url} target="_blank">
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent>
          <Typography component="h5">
            <b>{title}</b>
          </Typography>

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
