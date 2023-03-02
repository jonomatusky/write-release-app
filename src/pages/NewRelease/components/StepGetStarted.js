import React from 'react'
import { Box, Grid, Typography, Button, Link } from '@mui/material'

const StepGetStarted = ({ step, onAnswer, onNext }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            Let's write your release. We'll get started with a few quick
            questions.
          </Typography>
        </Grid>
        <Grid item container xs={12} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" size="large" onClick={onNext}>
              <Typography variant="h6" fontWeight="bold" component="p">
                Next
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" component="p" textAlign="center">
            By using this service, you agree to our{' '}
            <Link href="#">Terms of Service</Link> and{' '}
            <Link href="#">Privacy Policy</Link>.
          </Typography>
        </Grid>{' '}
      </Grid>
    </Box>
  )
}

export default StepGetStarted
