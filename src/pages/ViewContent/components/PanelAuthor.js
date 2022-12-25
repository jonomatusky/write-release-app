import React from 'react'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Person } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogAuthor from './DialogAuthor'

const PanelAuthor = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectIndividual } = useIndividualsStore()

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogAuthor} dialogProps={{ id }}>
        <Box p={2} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Authors</b>
              </Typography>
            </Grid>
            {content.individualsBy &&
              content.individualsBy.length > 0 &&
              content.individualsBy.map(individualId => {
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
export default PanelAuthor
