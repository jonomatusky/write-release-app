import React, { useCallback, useState } from 'react'
import { Box, Slide, Fade, Typography, Link } from '@mui/material'
import { use100vh } from 'hooks/use-100-vh'
import { useSearchParams } from 'react-router-dom'
import Emoji from 'components/Emoji'
import useSession from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { Navigate } from 'react-router'
import HeaderClose from 'layouts/HeaderClose'
import StepRenderer from './components/StepRenderer'
import useRequest from 'hooks/use-request'

const NewRelease = ({ requireVerification }) => {
  const { request } = useRequest()
  const { user, initializing } = useSession()
  const [answers, setAnswers] = useState({})
  const [prevStep, setPrevStep] = useState(-1)
  const [searchParams] = useSearchParams()

  const s = searchParams.get('s')

  let steps = [
    { name: 'start', isBreak: true },
    { name: 'type' },
    { name: 'tone' },
    { name: 'subject' },
    { name: 'location' },
  ]

  if (!!requireVerification) {
    steps.push({ name: 'verify', isBreak: true })
  }

  steps = [
    ...steps,
    { name: 'startLongQuestions', isBreak: true, key: 'lq' },
    { name: 'summary' },
    { name: 'significance' },
    { name: 'fit' },
    { name: 'quoted', key: 'q' },
    { name: 'haveBoilerplate', key: 'hbp' },
    { name: 'boilerplate', key: 'bp' },
  ]

  const startStep = Math.max(
    steps.findIndex(step => step.key === s),
    0
  )

  const [step, setStep] = useState(startStep)

  const handleSetStep = useCallback(
    async newStep => {
      if (newStep < 0) return
      if (newStep + 1 > steps.length) return

      setPrevStep(step)
      setStep(newStep)
    },
    [step, steps.length]
  )

  const handleNext = () => {
    handleSetStep(step + 1)
  }

  const handleBack = () => {
    handleSetStep(step - 1)
  }

  const handleAnswer = answer => {
    setAnswers({ ...answers, ...answer })
  }

  // catch scroll event
  // useEffect(() => {
  //   const handleScroll = e => {
  //     console.log('scrolling')
  //     e.preventDefault()
  //     const { scrollTop, scrollHeight, clientHeight } = e.target
  //     const scrollPercent = scrollTop / (scrollHeight - clientHeight)
  //     const scrollStep = Math.round(scrollPercent * (steps.length - 1))
  //     setStep(scrollStep + 1)
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [step, setStep, steps.length])

  // catch arrow key events
  // useEffect(() => {
  //   const handleKeyDown = e => {
  //     if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
  //       handleSetStep(step + 1)
  //     } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
  //       handleSetStep(step - 1)
  //     }
  //   }
  //   document.addEventListener('keydown', handleKeyDown)
  //   return () => document.removeEventListener('keydown', handleKeyDown)
  // }, [step, handleSetStep])

  const height = use100vh()

  if (initializing) {
    return <Loading />
  } else if (requireVerification && !!user) {
    return <Navigate replace to={'/releases/new'} />
  } else {
    return (
      <>
        {!!user && <HeaderClose />}
        <Box
          position="relative"
          width="100%"
          display="flex"
          justifyContent="center"
          height={height}
        >
          {steps.map((stepItem, index) => {
            const { name } = stepItem

            return (
              <Box
                position="absolute"
                zIndex={index === step ? 1 : -index}
                maxWidth="sm"
                width="100%"
                height={height}
                pl={2}
                pr={2}
                key={index}
                overflow="hidden"
              >
                <Slide
                  direction={
                    (index === step) !== !!(step > prevStep) ? 'down' : 'up'
                  }
                  in={index === step}
                  mountOnEnter
                  unmountOnExit
                  appear
                  timeout={800}
                  easing="ease-in-out"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width="100%"
                  >
                    <Fade in={index === step} timeout={650} appear>
                      <Box
                        width="100%"
                        maxHeight="100%"
                        display="flex"
                        justifyContent="center"
                        pb="50px"
                      >
                        <StepRenderer
                          name={name}
                          answers={answers}
                          onNext={handleNext}
                          onBack={handleBack}
                          onAnswer={handleAnswer}
                          request={request}
                        />
                      </Box>
                    </Fade>
                  </Box>
                </Slide>
              </Box>
            )
          })}
          <Box
            position="absolute"
            zIndex={100}
            bottom={0}
            left={0}
            right={0}
            display="flex"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height={50}
              // sx={{
              //   background:
              //     'linear-gradient(primary.main 0%, background.default 100%)',
              // }}
            >
              <Typography variant="body2">
                Created with <Emoji label="heart" symbol="❤️" /> by the team at{' '}
                <Link
                  href="https://www.gregoryfca.com"
                  target="_blank"
                  underline="hover"
                >
                  Gregory FCA
                  {/* {' '} */}
                  {/* <span
                style={{
                  display: 'inline-block',
                  transform: 'translateY(2px)',
                }}
              >
                <OpenInNew fontSize="inherit" />
              </span> */}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}

export default NewRelease
