import React from 'react'
import { Box, Typography } from '@mui/material'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import PanelEdit from 'layouts/PanelEdit'
import DialogEditBio from './DialogEditBio'

const PanelBio = ({ individual }) => {
  console.log(individual.bio)
  const contentState = convertFromRaw(individual.bio)
  let html = stateToHTML(contentState)

  return (
    <PanelEdit dialog={DialogEditBio}>
      <Box p={2}>
        <Typography color="primary" variant="h6">
          <b>Bio</b>
        </Typography>
        <Typography dangerouslySetInnerHTML={{ __html: html }}></Typography>
      </Box>
    </PanelEdit>
  )
}

export default PanelBio
