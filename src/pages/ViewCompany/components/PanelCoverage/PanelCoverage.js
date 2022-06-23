import React, { useState } from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import DialogEditHighlights from './DialogEditHighlight'
import Panel from 'layouts/Panel'
import useSession from 'hooks/use-session'
import CoverageItem from './CoverageItem'
import DialogAddCoverage from 'components/DialogAddCoverage'

const PanelCoverage = ({ coverage }) => {
  const { user } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogAddCoverage open={open} onClose={() => setOpen(false)} />
      {(!!user || (coverage && coverage.length > 0)) && (
        <Grid item xs={12}>
          <Panel dialog={DialogEditHighlights}>
            <Box p={2} pb={1}>
              <Typography color="primary" variant="h6">
                <b>Recent</b>
              </Typography>
            </Box>
            <Grid container>
              {coverage.map(coverageItem => (
                <CoverageItem
                  coverageItem={coverageItem}
                  key={coverageItem.id}
                />
              ))}
              {user && (
                <Grid item xs={12}>
                  <Button onClick={() => setOpen(true)}>Add Coverage</Button>
                </Grid>
              )}
            </Grid>
          </Panel>
        </Grid>
      )}
    </>
  )
}

export default PanelCoverage
