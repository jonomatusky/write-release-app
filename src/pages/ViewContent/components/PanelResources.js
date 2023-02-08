import React from 'react'
import { Grid, Box, Chip, Typography } from '@mui/material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogResources from './DialogResources'
import useResourcesStore from 'hooks/store/use-resources-store'

const PanelResources = ({ id }) => {
  const { items } = useResourcesStore()

  const resources = items.filter(item => item.content === id)

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogResources} dialogProps={{ id }}>
        <Box p={1.5} pt={1} overflow="hidden">
          <Grid container spacing={0.5} overflow="hidden">
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Resources</b>
              </Typography>
            </Grid>
            {resources.map(resource => {
              return (
                <Grid item key={resource.id}>
                  <Chip label={resource.title} size="small" />
                </Grid>
              )
            })}
            {(!resources || resources.length === 0) && (
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="body2">
                  <i>No resources</i>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelResources
