import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import Highlight from './Highlight'
import useSession from 'hooks/use-session'
import useFetchCoverage from 'hooks/use-fetch-coverage'
import PanelEdit from 'layouts/PanelEdit'
import { Add } from '@mui/icons-material'
import DialogAddCoverage from 'components/DialogAddCoverage'

const PanelHighlights = ({ id }) => {
  const { user } = useSession()

  const { coverage } = useFetchCoverage({
    object: 'individual',
    id,
  })

  const sortedCoverage = [...coverage].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  return (
    <>
      {(!!user || sortedCoverage.length > 0) && (
        <Grid item xs={12}>
          <PanelEdit dialog={DialogAddCoverage} icon={Add}>
            <Box p={2} pt={1}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography color="primary">
                    <b>Highlights</b>
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
        </Grid>
      )}
    </>
  )
}

export default PanelHighlights
