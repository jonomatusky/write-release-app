import React from 'react'
import { Typography, Box, Link, Grid } from '@mui/material'
import Image from 'components/Image'

const CoverageItem = ({ coverageItem }) => {
  const { url, title, outlet, image } = coverageItem

  return (
    <Grid item xs={12}>
      <Box p={2} display="flex">
        <Box flexGrow={1}>
          <Image
            component="img"
            height="60"
            width="100"
            src={image}
            alt={title}
          />
        </Box>
        <Box flexGrow={2}>
          <Typography>
            <Link href={url}>{title}</Link>
          </Typography>
          <Typography>{outlet}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default CoverageItem
