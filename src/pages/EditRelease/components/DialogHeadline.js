import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import GeneratedOption from './GeneratedOption'
import useContentStore from 'hooks/store/use-content-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useGenerate from 'hooks/use-generate'

const DialogHeadline = ({ id, content, open, onClose }) => {
  const [index, setIndex] = useState(0)

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

  const handleSubmit = async () => {
    await update({ id, title: headlineOptions[index] })
    onClose()
  }

  return (
    <LayoutDialogEdit
      open={open}
      title="Let's write your release. First, choose a headline:"
      onSave={handleSubmit}
      disableBackdropClick
      disabled={!headlineOptions || headlineOptions.length === 0}
      loading={updateStatus === 'pending'}
    >
      <Box minHeight="300px" display="flex" alignItems="center">
        <Grid container spacing={3}>
          {headlineOptions && headlineOptions.length > 0 && (
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
          )}
          {(!headlineOptions || headlineOptions.length === 0) && (
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
          )}
        </Grid>
      </Box>
    </LayoutDialogEdit>
  )
}

export default DialogHeadline
