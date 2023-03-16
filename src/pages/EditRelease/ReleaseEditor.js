import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Grid, Paper, Skeleton } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useGetContent from 'hooks/use-get-content'
import HeaderEdit from 'layouts/HeaderEdit'
import useGenerate from 'hooks/use-generate'
import { LoadingButton } from '@mui/lab'
import { useParams } from 'react-router'
import { use100vh } from 'hooks/use-100-vh'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import { IosShare, Loop } from '@mui/icons-material'
import DialogShare from './components/DialogShare'
import HeadlineOptions from './components/HeadlineOptions'

const ReleaseEditor = () => {
  const { id } = useParams()
  const { content, status, get } = useGetContent(id)

  const { update } = useContentStore()

  // const textEndRef = useRef(null)

  // const [selectedText, setSelectedText] = useState(0)

  const { generate: generateText, options } = useGenerate()

  const optionsText = options.map(option => option.text)

  const textOptions =
    !content.textOptions || content.textOptions?.length === 0
      ? optionsText
      : content.textOptions

  // const scrollToBottom = () => {
  //   textEndRef.current &&
  //     textEndRef.current.scrollTo({
  //       left: 0,
  //       top: textEndRef.current.scrollHeight,
  //       behavior: 'smooth',
  //     })
  // }

  // const readyToSave =
  //   !!textOptions && textOptions.length > 0 && selectedText !== null

  const height = use100vh()

  const [showShare, setShowShare] = useState(false)
  const [isWriting, setIsWriting] = useState(false)
  const [timerIsRunning, setTimerIsRunning] = useState(false)

  const textIsLoading = timerIsRunning || isWriting
  const isComplete = !!content.title && !!content.text

  console.log('refreshing')

  // const handleGenerate = async () => {
  //   if (!isComplete) {
  //     if (readyToSave) {
  //       const newText = textOptions[selectedText]
  //       await update({ id, text: newText })
  //       // scrollToBottom()
  //     } else {
  //       await generateText(id, 'text')
  //       // await update({ id, textOptions: optionsText })
  //       // scrollToBottom()
  //     }
  //   }
  // }

  const handleGenerate = async () => {
    if ((content.textOptions || []).length === 0) {
      setIsWriting(true)
      setTimerIsRunning(true)
      await generateText(id, 'text')
      await get()
      setIsWriting(false)
    }
  }

  const handleRewrite = useCallback(async () => {
    if (content.textOptions) {
      setIsWriting(true)
      setTimerIsRunning(true)
      const currentIndex = content.textOptionsIndex
      const newIndex =
        currentIndex >= textOptions.length - 1 ? 0 : currentIndex + 1

      try {
        await update({
          id,
          textOptionsIndex: newIndex,
          text: content.textOptions[newIndex],
        })
      } catch (error) {}

      setIsWriting(false)
    }
  }, [content, id, textOptions, update])

  useEffect(() => {
    if (timerIsRunning) {
      const timer = setTimeout(() => {
        setTimerIsRunning(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [timerIsRunning, setTimerIsRunning])

  if (status === 'failed') {
    return <NotFound />
  } else if (status !== 'succeeded') {
    return <Loading />
  } else {
    return (
      <>
        {!!content && (
          <>
            <DialogShare
              open={showShare}
              onClose={() => setShowShare(false)}
              content={content}
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
                    // ref={textEndRef}
                    variant="outlined"
                    sx={{
                      p: 2,
                      pt: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      overflow: 'scroll',
                    }}
                  >
                    {status === 'succeeded' && (
                      <HeadlineOptions
                        content={content}
                        id={id}
                        onComplete={handleGenerate}
                      />
                    )}
                    {content.title && (
                      <Typography gutterBottom pb={2} whiteSpace="pre-line">
                        <b>{content.title}</b>
                      </Typography>
                    )}
                    {!!content.text && !textIsLoading && (
                      <Typography gutterBottom pb={2} whiteSpace="pre-line">
                        {content.text || ''}
                      </Typography>
                    )}
                    {textIsLoading &&
                      [1, 1, 1, 1, 1, 1].map((item, index) => (
                        <Box pb={2} key={index}>
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
                        </Box>
                      ))}
                  </Paper>
                </Box>
                <Box height="100px" display="flex" alignItems="center">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <LoadingButton
                        onClick={handleRewrite}
                        fullWidth
                        variant="outlined"
                        size="large"
                        disabled={(textOptions || []).length === 0}
                        sx={{
                          height: 56,
                        }}
                        startIcon={<Loop />}
                        loading={textIsLoading}
                      >
                        Rewrite
                      </LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                      <LoadingButton
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() => setShowShare(true)}
                        pb={1}
                        sx={{
                          height: 56,
                        }}
                        disabled={!isComplete}
                        endIcon={<IosShare />}
                      >
                        Export
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </>
    )
  }
}

export default ReleaseEditor
