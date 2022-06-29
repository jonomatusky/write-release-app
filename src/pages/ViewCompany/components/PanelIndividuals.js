import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import Individual from './Individual'
import PanelEdit from 'layouts/PanelEdit'
import { Add } from '@mui/icons-material'
import DialogCreateIndividual from './DialogCreateIndividual'

const PanelIndividuals = ({ individuals, id }) => {
  const sortedIndividuals = [...individuals].sort((a, b) => {
    return b.lastName - a.lastName
  })

  return (
    <PanelEdit
      dialog={DialogCreateIndividual}
      dialogProps={{ organization: id }}
      icon={Add}
    >
      <Box p={2} pt={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="primary">
              <b>Spokespeople</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box overflow="scroll" display="flex" flexWrap="none" width="100%">
              {sortedIndividuals.map(individual => (
                <Box key={(individual || {}).id} pr={1} mb={2}>
                  <Individual individual={individual} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PanelEdit>
  )
}

export default PanelIndividuals
