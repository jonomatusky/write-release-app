import { LocalOffer } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import useIndustriesStore from 'hooks/store/use-industries-store'
import React from 'react'

const IndustryTag = ({ id }) => {
  const { select } = useIndustriesStore()
  const industry = select(id)

  return (
    <>
      {industry && industry.name !== 'Other' && (
        <Box display="flex" alignItems="center">
          <Box pr={0.5} display="flex" alignItems="center">
            <LocalOffer color="primary" fontSize="12" />
          </Box>
          <Typography>{industry.name}</Typography>
        </Box>
      )}
    </>
  )
}

export default IndustryTag
