import React, { useCallback, useState } from 'react'
import { Box, Slide, Fade, Typography, Link } from '@mui/material'
import StepGetStarted from './components/StepGetStarted'
import StepType from './components/StepType'
import StepTone from './components/StepTone'
import { use100vh } from 'hooks/use-100-vh'
import { useSearchParams } from 'react-router-dom'
import StepWho from './components/StepWho'
import StepWhere from './components/StepWhere'
import StepVerify from './components/StepEmail'
import Emoji from 'components/Emoji'
import useSession from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { Navigate, useNavigate } from 'react-router'
import StepBreakLongQuestions from './components/StepBreakLongQuestions'
import TemplateLongQuestion from './components/TemplateLongQuestion'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import StepQuoted from './components/StepQuoted'
import StepHaveBoilerplate from './components/StepHaveBoilerplate'
import useContentStore from 'hooks/store/use-content-store'
import HeaderClose from 'layouts/HeaderClose'

const NewRelease = ({ requireVerification }) => {
  const { user, initializing } = useSession()
  const [answers, setAnswers] = useState({})
  const [prevStep, setPrevStep] = useState(-1)
  const [searchParams] = useSearchParams()
  const { create } = useContentStore()
  const navigate = useNavigate()

  const { select } = useContentTypesStore()
  const contentType = select(answers.type) || {}

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

  const { summary, significance, fit } = contentType

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
        {name === 'startLongQuestions' && <StepBreakLongQuestions {...props} />}
        {name === 'summary' && (
          <TemplateLongQuestion
            name="summary"
            subtitle="What's the main story? What are the key points?"
            placeholder="Write a short summary of the release. The more detail, the better. Sentence fragments - fine."
            value={answers.summary}
            {...summary}
            label="What's this release about?"
            {...props}
          />
        )}
        {name === 'significance' && (
          <TemplateLongQuestion
            name="significance"
            subtitle="What's unique or important about this news? Why will readers care? What's the impact?"
            // placeholder="Tell us why this matters. The more detail, the better. Sentence fragments - fine."
            value={answers.significance}
            {...significance}
            label="Why does it matter?"
            {...props}
          />
        )}
        {name === 'fit' && (
          <TemplateLongQuestion
            name="fit"
            subtitle="Is it a new direction? A first for the company? A continuation of their ongoing mission?"
            // placeholder="The more detail, the better. Sentence fragments - fine."
            value={answers.fit}
            {...fit}
            label="How does this fit into the company's mission, vision, or journey?"
            {...props}
          />
        )}
        {name === 'quoted' && <StepQuoted {...props} />}
        {name === 'haveBoilerplate' && <StepHaveBoilerplate {...props} />}
        {name === 'boilerplate' && (
          <TemplateLongQuestion
            label={
              !!answers.hasBoilerplate
                ? 'Enter the company’s boilerplate'
                : 'Tell us a little about the company'
            }
            subtitle={
              !!answers.hasBoilerplate
                ? null
                : "We'll use this to generate the boilerplate and improve the release."
            }
            placeholder="Acme Inc. is a leading provider of widgets and gizmos. The company was founded in 1984 and is headquartered in New York City."
            value={
              !!answers.hasBoilerplate
                ? answers.boilerplate
                : answers.aboutCompany
            }
            {...props}
            name={!!answers.hasBoilerplate ? 'boilerplate' : 'aboutCompany'}
          />
        )}
      </>
    )
  }

  const handleSetStep = useCallback(
    async newStep => {
      if (newStep < 0) return
      if (newStep + 1 > steps.length) {
        const newRelease = await create(answers)
        if (newRelease) {
          navigate(`/releases/${newRelease.id}`)
        }
      }

      setPrevStep(step)
      setStep(newStep)
    },
    [step, steps.length, answers, create, navigate]
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
