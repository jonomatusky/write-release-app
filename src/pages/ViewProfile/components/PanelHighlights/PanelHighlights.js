import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import DialogEditHighlights from './DialogEditHighlight'
import Highlight from './Highlight'
import Panel from 'layouts/Panel'
import ButtonAddHighlight from './ButtonAddHighlight'
import useSession from 'hooks/use-session'

const PanelHighlights = ({ individual }) => {
  const { user } = useSession()

  const highlights = individual.highlights

  return (
    <>
      {(!!user || (highlights && highlights.length > 0)) && (
        <Grid item xs={12}>
          <Panel dialog={DialogEditHighlights}>
            <Box p={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h6">
                    <b>Media Highlights</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  {highlights[0] ? (
                    <Highlight index={0} highlights={highlights} />
                  ) : user ? (
                    <ButtonAddHighlight index={0} />
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  {highlights[1] ? (
                    <Highlight index={1} highlights={highlights} />
                  ) : user ? (
                    <ButtonAddHighlight index={1} disabled={!highlights[0]} />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Panel>
        </Grid>
      )}
    </>
  )
}

export default PanelHighlights
