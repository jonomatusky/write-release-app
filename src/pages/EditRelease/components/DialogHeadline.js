import React, { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import GeneratedOption from './GeneratedOption'
import useContentStore from 'hooks/store/use-content-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useGenerate from 'hooks/use-generate'

const DialogHeadline = ({ id, open }) => {
  const [index, setIndex] = useState(null)

  const { generate, options, status } = useGenerate()

  const { update, updateStatus } = useContentStore()

  const handleGenerate = async () => {
    await generate(id, 'title')
  }

  const handleSelectHeadline = i => {
    setIndex(i)
  }

  const handleSubmit = async () => {
    await update({ id, title: options[index].text })
  }

  return (
    <LayoutDialogEdit
      open={open}
      title="Let's write your release. First, choose a headline:"
      onSave={handleSubmit}
      disableBackdropClick
      disabled={index === null}
      loading={updateStatus === 'pending'}
    >
      <Box minHeight="300px" display="flex" alignItems="center">
        <Grid container spacing={3}>
          {options && options.length > 0 && (
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
          )}
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
        </Grid>
      </Box>
    </LayoutDialogEdit>
  )
}

export default DialogHeadline
