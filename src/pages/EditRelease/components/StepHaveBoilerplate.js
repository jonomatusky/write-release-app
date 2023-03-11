import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import GridButtons from './GridButtons'

const StepHaveBoilerplate = ({ onBack, onNext, onAnswer, answers }) => {
  const handleClick = hasBoilerplate => {
    onAnswer({ hasBoilerplate })
    onNext()
  }

  return (
    <Grid container justifyContent="flex-start" spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">
          <b>One finishing touch: Do you have any company boilerplate?</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          This appears at the end of the release, under “About{' '}
          {answers.company || 'Your Company'}". If you don't have one or you're
          not sure, we'll write one for you!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={() => handleClick(true)}
        >
          <Typography variant="h6" fontWeight="bold" component="p">
            Yes, I already have one
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={() => handleClick(false)}
        >
          <Typography variant="h6" fontWeight="bold" component="p">
            No, write one for me
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <GridButtons onBack={onBack} />
      </Grid>
    </Grid>
  )
}

export default StepHaveBoilerplate
