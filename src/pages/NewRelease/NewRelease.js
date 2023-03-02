import React, { useCallback, useEffect, useState } from 'react'
import { Box, Slide, Fade, Typography, Link } from '@mui/material'
import StepGetStarted from './components/StepGetStarted'
import StepType from './components/StepType'
import StepTone from './components/StepTone'
import { use100vh } from 'hooks/use-100-vh'
// import { useSearchParams } from 'react-router-dom'
import StepWho from './components/StepWho'
import StepWhere from './components/StepWhere'
import StepVerify from './components/StepVerify'
import Emoji from 'components/Emoji'
import useSession from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { Navigate } from 'react-router'

const NewRelease = ({ requireVerification }) => {
  const { user, initializing } = useSession()
  const [answers, setAnswers] = useState({})
  // const [searchParams, setSearchParams] = useSearchParams()

  let steps = [
    { name: 'start', isBreak: true },
    { name: 'type' },
    { name: 'tone' },
    { name: 'subject' },
    { name: 'location' },
  ]

  if (!!requireVerification) {
    steps.push({ name: 'verify', isBreak: true })
  } else {
    steps.push([])
  }

  const unansweredQuestions = steps
    .filter(step => !step.isBreak)
    .filter(step => !answers[step.name])

  const startStepName =
    unansweredQuestions.length > 0
      ? unansweredQuestions[0]
      : steps[steps.length - 1]
  const startStep = Math.max(
    steps.findIndex(step => step.name === startStepName),
    0
  )

  const [step, setStep] = useState(startStep)
  const [prevStep, setPrevStep] = useState(-1)

  // const stepValue = searchParams.get('step')
  // const stepInt = parseInt(stepValue)
  // const step = isNaN(stepInt) ? 1 : stepInt

  // useEffect(() => {
  //   if (step === 0 || isNaN(stepInt)) {
  //     setSearchParams(new URLSearchParams({ step: 1 }))
  //   }
  // }, [step, stepInt, setSearchParams])

  const StepRenderer = props => {
    const { name } = props

    return (
      <>
        {name === 'start' && <StepGetStarted {...props} />}
        {name === 'type' && <StepType {...props} />}
        {name === 'tone' && <StepTone {...props} />}
        {name === 'subject' && <StepWho {...props} />}
        {name === 'location' && <StepWhere {...props} />}
        {name === 'verify' && <StepVerify {...props} />}
      </>
    )
  }

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
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleSetStep(step + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handleSetStep(step - 1)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [step, handleSetStep])

  const height = use100vh()

  if (initializing) {
    return <Loading />
  } else if (requireVerification && !!user) {
    return <Navigate replace to={'/release/new'} />
  } else {
    return (
      <Box
        position="relative"
        width="100%"
        display="flex"
        justifyContent="center"
        height={height}
      >
        {steps.map((stepItem, index) => {
          const { name, Component } = stepItem

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
    )
  }
}

export default NewRelease
