import React from 'react'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import { Person } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogContents from './DialogContents'

const PanelContents = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const contents = content.individuals

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogContents} dialogProps={{ id }}>
        <Box p={2} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Individuals</b>
              </Typography>
            </Grid>
            {contents &&
              contents.length > 0 &&
              contents.map(contentId => {
                const content = select(contentId)
                return (
                  <Grid item xs={12} key={contentId}>
                    <Chip
                      label={content.titleInternal}
                      size="small"
                      icon={<Person />}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelContents
