import React, { useRef, useState } from 'react'
import { Box, Typography, Button, Grid, Paper, Skeleton } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useGetContent from 'hooks/use-get-content'
import HeaderEdit from 'layouts/HeaderEdit'
import useGenerate from 'hooks/use-generate'
import { LoadingButton } from '@mui/lab'
import { useParams } from 'react-router'
import { use100vh } from 'hooks/use-100-vh'
import DialogHeadline from './components/DialogHeadline'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'

const ReleaseEditor = () => {
  const { id } = useParams()
  const { content, status } = useGetContent(id)

  const { update } = useContentStore()

  const textEndRef = useRef(null)

  const [selectedText, setSelectedText] = useState(0)

  const {
    generate: generateText,
    options: textOptions,
    status: textStatus,
  } = useGenerate()

  const scrollToBottom = () => {
    textEndRef.current &&
      textEndRef.current.scrollTo({
        left: 0,
        top: textEndRef.current.scrollHeight,
        behavior: 'smooth',
      })
  }

  const handleGenerate = async () => {
    if (!!textOptions && textOptions.length > 0 && selectedText !== null) {
      const text = content.text || ''
      const newText = text + textOptions[selectedText]?.text + '\n\n'
      await update({ id, text: newText })
      scrollToBottom()
    }

    await generateText(id, 'text')
    scrollToBottom()
  }

  const handleRewrite = () => {
    if (selectedText >= textOptions.length - 1) {
      setSelectedText(0)
    } else {
      setSelectedText(selectedText + 1)
    }

    scrollToBottom()
  }

  const height = use100vh()

  if (status === 'failed') {
    return <NotFound />
  } else if (status !== 'succeeded') {
    return <Loading />
  } else {
    return (
      <>
        <DialogHeadline
          open={status === 'succeeded' && !content.title}
          id={id}
        />
        <HeaderEdit />
        <Box
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          height={height}
        >
          <Box
            maxWidth="sm"
            width="100%"
            height={height}
            pl={2}
            pr={2}
            overflow="hidden"
          >
            <Box height="calc(100% - 100px)" pt={8}>
              <Paper
                ref={textEndRef}
                variant="outlined"
                sx={{
                  p: 2,
                  pt: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'scroll',
                }}
              >
                {content.title && (
                  <Typography gutterBottom pb={2} whiteSpace="pre-line">
                    <b>{content.title}</b>
                  </Typography>
                )}
                {!!content.text && (
                  <Typography gutterBottom pb={2} whiteSpace="pre-line">
                    {content.text?.trim() || ''}
                  </Typography>
                )}
                {!!textOptions && textOptions.length > 0 && (
                  <Typography
                    color="primary"
                    gutterBottom
                    pb={1}
                    whiteSpace="pre-line"
                  >
                    {textOptions[selectedText]?.text?.trim() || ''}
                  </Typography>
                )}
                {textStatus === 'loading' && (
                  <>
                    <Typography>
                      <Skeleton variant="text" />
                    </Typography>
                    <Typography>
                      <Skeleton variant="text" />
                    </Typography>
                    <Typography>
                      <Skeleton variant="text" />
                    </Typography>
                    <Typography>
                      <Skeleton variant="text" width="65%" />
                    </Typography>
                  </>
                )}
                <div ref={textEndRef} />
              </Paper>
            </Box>
            <Box height="100px" display="flex" alignItems="center">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    onClick={handleRewrite}
                    fullWidth
                    variant="outlined"
                    size="large"
                    disabled={!textOptions || textOptions.length === 0}
                    sx={{
                      height: 56,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" component="p">
                      Rewrite
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleGenerate}
                    loading={textStatus === 'loading'}
                    pb={1}
                    sx={{
                      height: 56,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" component="p">
                      Write More
                    </Typography>
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}

export default ReleaseEditor
