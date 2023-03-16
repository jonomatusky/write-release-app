import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import GeneratedOption from './GeneratedOption'
import useContentStore from 'hooks/store/use-content-store'
import useGenerate from 'hooks/use-generate'

const HeadlineOptions = ({ id, content, onComplete }) => {
  const [index, setIndex] = useState(null)

  const { generate, options, status } = useGenerate()

  const optionsText = options.map(option => option.text)

  const { update, updateStatus } = useContentStore()

  const headlineOptions =
    !content.titleOptions || content.titleOptions?.length === 0
      ? optionsText
      : content.titleOptions

  const handleGenerate = async () => {
    await generate(id, 'title')
    // await update({ id, titleOptions: optionsText })
  }

  const handleSelectHeadline = i => {
    setIndex(i)
  }

  const [showHeadline, setShowHeadline] = useState(
    (content.textOptions || []).length === 0
  )

  const handleSubmit = async () => {
    await update({ id, title: headlineOptions[index] })
    setShowHeadline(false)
    onComplete()
  }

  return (
    <>
      {showHeadline ? (
        <Box display="flex" alignItems="center">
          <Grid container spacing={3}>
            {(headlineOptions || []).length > 0 && (
              <>
                <Grid item xs={12}>
                  <Typography textAlign="center">
                    <b>Great, now pick your favorite headline:</b>
                  </Typography>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                  {headlineOptions.map((option, i) => (
                    <Grid item xs={12} key={i}>
                      <GeneratedOption
                        generation={option}
                        selected={index === i}
                        onSelected={() => handleSelectHeadline(i)}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    loading={updateStatus === 'pending'}
                  >
                    Select & Write Release
                  </LoadingButton>
                </Grid>
              </>
            )}
            {(headlineOptions || []).length === 0 && (
              <>
                <Grid item xs={12}>
                  <Typography textAlign="center">
                    <b>
                      Let's write your release. First, we'll start with the
                      headline:
                    </b>
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <LoadingButton
                    // fullWidth
                    variant="outlined"
                    size="large"
                    onClick={handleGenerate}
                    loading={status === 'loading'}
                  >
                    Generate Headlines
                  </LoadingButton>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      ) : (
        <Typography gutterBottom pb={2} whiteSpace="pre-line">
          <b>{content.title}</b>
        </Typography>
      )}
    </>
  )
}

export default HeadlineOptions
