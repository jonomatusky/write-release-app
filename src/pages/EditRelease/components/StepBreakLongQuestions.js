import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import GridButtons from './GridButtons'

const StepBreakLongQuestions = ({ step, onAnswer, onNext, onBack }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            Now let's go through the content of the release.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            Do't worry about grammar, typos, or full sentences.
          </Typography>
        </Grid>
        <Grid item xs={12} pb={2}>
          <Typography variant="h5" component="h1" gutterBottom>
            Just remember: the more info you give us, the better the release
            will turn out!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GridButtons onBack={onBack} onNext={onNext} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default StepBreakLongQuestions
