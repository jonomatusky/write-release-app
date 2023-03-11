import React, { useRef } from 'react'
import { Box, Grid, Paper, Typography, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import useContentStore from 'hooks/store/use-content-store'

const StepGenerateText = ({
  id,
  onNext,
  generate,
  options,
  status,
  index,
  onSelect,
}) => {
  const { update, select } = useContentStore()
  const content = select(id)

  const textEndRef = useRef(null)

  const scrollToBottom = () => {
    console.log('scrolling to bottom')

    textEndRef.current &&
      textEndRef.current.scrollTo(0, textEndRef.current.scrollHeight)
  }

  const handleGenerate = async () => {
    if (!!options && !!index) {
      const text = content.text || ''
      const newText = text + options[index].text + '\n\n'
      await update({ id, text: newText })
    }

    await generate(id, 'text')
    scrollToBottom()
  }

  return (
    <Box height="100%">
      <Box height="calc(100% - 80px)" pt={8}>
        <Paper
          ref={textEndRef}
          variant="outlined"
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          {content.title && (
            <Typography gutterBottom pb={1} whiteSpace="pre-line">
              <b>{content.title}</b>
            </Typography>
          )}
          {!!content.text && (
            <Typography gutterBottom pb={1} whiteSpace="pre-line">
              {content.text?.trim()}
            </Typography>
          )}
          {!!options && options.length > 0 && (
            <Typography
              color="primary"
              gutterBottom
              pb={1}
              whiteSpace="pre-line"
            >
              {options[index].text.trim()}
            </Typography>
          )}
          <div ref={textEndRef} />
        </Paper>
      </Box>
      <Box height="80px" display="flex" alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={() => onSelect(index + 1)}
              fullWidth
              variant="outlined"
              size="large"
            >
              Rewrite Section
            </Button>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              fullWidth
              variant="contained"
              size="large"
              onClick={handleGenerate}
              loading={status === 'loading'}
              pb={1}
            >
              <Typography fontWeight="bold" component="p">
                Next Section
              </Typography>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default StepGenerateText
