import React from 'react'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Person } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogQuotes from './DialogIndividuals'

const PanelIndividuals = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectIndividual } = useIndividualsStore()

  const individuals = content.individuals

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogQuotes} dialogProps={{ id }}>
        <Box p={1.5} pt={1} overflow="hidden">
          <Grid container spacing={0.5} overflow="hidden">
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Individuals</b>
              </Typography>
            </Grid>
            {individuals &&
              individuals.length > 0 &&
              individuals.map(individualId => {
                const individual = selectIndividual(individualId)
                return (
                  <Grid item xs={12} key={individualId}>
                    <Chip
                      label={individual.name}
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
export default PanelIndividuals
