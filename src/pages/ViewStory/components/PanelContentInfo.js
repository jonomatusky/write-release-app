import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Person } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'

const PanelContentInfo = ({ dialog, title, children }) => {
  const { id } = useParams()
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectIndividual } = useIndividualsStore()

  return (
    <PanelEdit dialog={dialog}>
      <Box p={2} pt={1}>
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <Typography color="primary">
              <b>Background</b>
            </Typography>
          </Grid>
          {content.individualsQuoted &&
            content.individualsQuoted.length > 0 &&
            content.individualsQuoted.map(individualId => {
              const individual = selectIndividual(individualId)
              return (
                <Chip
                  label={individual.name}
                  key={individualId}
                  size="small"
                  icon={<Person />}
                />
              )
            })}
        </Grid>
      </Box>
    </PanelEdit>
  )
}
export default PanelContentInfo
