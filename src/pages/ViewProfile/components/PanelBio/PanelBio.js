import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import PanelEdit from 'layouts/PanelEdit'
import DialogEditBio from './DialogEditBio'
import useSession from 'hooks/use-session'

const PanelBio = ({ individual }) => {
  const { user } = useSession()

  const bio = individual.bio

  let html

  if (bio) {
    try {
      const contentState = convertFromRaw(JSON.parse(bio))
      html = stateToHTML(contentState)
    } catch (err) {
      html = '<p></p>'
    }
  }

  return (
    <>
      {(!!user || bio) && (
        <Grid item xs={12}>
          <PanelEdit dialog={DialogEditBio}>
            <Box p={2}>
              <Typography color="primary" variant="h6">
                <b>Bio</b>
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{ __html: html }}
              ></Typography>
            </Box>
          </PanelEdit>
        </Grid>
      )}
    </>
  )
}

export default PanelBio
