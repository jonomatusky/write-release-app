import React from 'react'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Person } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogQuotes from './DialogQuotes'

const PanelQuotes = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectIndividual } = useIndividualsStore()

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogQuotes} dialogProps={{ id }}>
        <Box p={2} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Quotes</b>
              </Typography>
            </Grid>
            {content.individualsQuoted &&
              content.individualsQuoted.length > 0 &&
              content.individualsQuoted.map(individualId => {
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
export default PanelQuotes
