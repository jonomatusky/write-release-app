import React, { useEffect } from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Link,
  Box,
} from '@mui/material'
import { OpenInNew } from '@mui/icons-material'

import useRequest from 'hooks/use-request'

const LinkPreview = ({ url, title, source, image }) => {
  // const { request, status } = useRequest()
  // const [data, setData] = { url, title, description, image }

  // useEffect(() => {
  //   if (status === 'idle' && (!!url || !!title || !!description || !!image)) {
  //     let res = request({ url })
  //     console.log(res)
  //   }
  // })

  // https://javascript.plainenglish.io/make-a-link-preview-ultimate-step-by-step-guide-5f0ac827cc89

  return (
    <Card variant="outlined">
      <CardActionArea href={url} target="_blank">
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent>
          <Typography component="h5">
            <b>{title}</b>
          </Typography>

          <Box display="flex" alignItems="center" pt={0.5}>
            <Typography variant="body2" component="p">
              {source}
            </Typography>
            <OpenInNew fontSize="inherit" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default LinkPreview
