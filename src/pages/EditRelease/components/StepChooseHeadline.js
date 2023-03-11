import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import GeneratedOption from './GeneratedOption'
import GridButtons from 'pages/NewRelease/components/GridButtons'
import useContentStore from 'hooks/store/use-content-store'

const StepGetStarted = ({
  id,
  onNext,
  generate,
  options,
  status,
  index,
  onSelect,
}) => {
  const { update, updateStatus } = useContentStore()

  const handleGenerate = async () => {
    await generate(id, 'title')
    await update({ id, titleOptions: options })
  }

  const handleSelectHeadline = index => {
    onSelect(index)
  }

  const handleNext = async () => {
    await update({ id, title: options[index].text, titleOptionsIndex: index })
    onNext()
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            Great, let's write your release. First, choose a headline:
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          {options.map((option, i) => (
            <Grid item xs={12} key={option.id}>
              <GeneratedOption
                generation={option}
                selected={index === i}
                onSelected={() => handleSelectHeadline(i)}
              />
            </Grid>
          ))}
        </Grid>
        {!options ||
          (options.length === 0 && (
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                variant="contained"
                size="large"
                onClick={handleGenerate}
                loading={status === 'loading'}
              >
                <Typography variant="h6" fontWeight="bold" component="p">
                  Generate Headlines
                </Typography>
              </LoadingButton>
            </Grid>
          ))}
        {options && options.length > 0 && (
          <Grid item xs={12}>
            <GridButtons
              onNext={handleNext}
              disabled={index === null}
              loading={updateStatus === 'pending'}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default StepGetStarted
