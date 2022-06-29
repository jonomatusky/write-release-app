import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import Highlight from 'components/Coverage/Highlight'
import PanelEdit from 'layouts/PanelEdit'
import { Add } from '@mui/icons-material'
import DialogAddCoverage from 'components/Coverage/DialogAddCoverage'

const PanelCoverage = ({
  coverage,
  label,
  type,
  individuals,
  organization,
  individual,
}) => {
  const sortedCoverage = [...coverage].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  return (
    <PanelEdit
      dialog={DialogAddCoverage}
      icon={Add}
      dialogProps={{
        fields: {
          organizations: [organization],
          individuals: [individual],
        },
      }}
    >
      <Box p={2} pt={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography color="primary">
              <b>{label}</b>
            </Typography>
          </Grid>
          <>
            {sortedCoverage.map(coverageItem => (
              <Grid item xs={12} md={6} key={coverageItem.id}>
                <Highlight index={0} highlight={coverageItem} />
              </Grid>
            ))}
          </>
        </Grid>
      </Box>
    </PanelEdit>
  )
}

export default PanelCoverage
