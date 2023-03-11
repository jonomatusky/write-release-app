import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Slide,
  Fade,
  Typography,
  Link,
  Container,
  IconButton,
} from '@mui/material'
import StepGetStarted from './components/StepChooseHeadline'
import { use100vh } from 'hooks/use-100-vh'
import Emoji from 'components/Emoji'
import useSession from 'hooks/use-session'
import Loading from 'pages/Loading/Loading'
import { Navigate, useParams } from 'react-router'
import Verify from './components/Verify'
import Logo from 'assets/images/writerelease_mark.png'
import useContentStore from 'hooks/store/use-content-store'
import useGetContent from 'hooks/use-get-content'
import NotFound from 'pages/NotFound/NotFound'
import HeaderEdit from 'layouts/HeaderEdit'
import useGenerate from 'hooks/use-generate'
import StepGenerateText from './components/StepGenerateText'

const EditRelease = () => {
  const { id } = useParams()
  const { user, initializing } = useSession()
  const [answers, setAnswers] = useState({})
  const [prevStep, setPrevStep] = useState(-1)
  const { content, status } = useGetContent(id)

  let steps = [
    { name: 'start', isBreak: true },
    { name: 'text', isBreak: true },
  ]

  const [step, setStep] = useState(!!content.title ? 1 : 0)

  const [selectedHeadline, setSelectedHeadline] = useState(null)

  const {
    generate: generateHeadline,
    options: headlineOptions,
    status: generationStatus,
  } = useGenerate()

  const [selectedText, setSelectedText] = useState(0)

  const {
    generate: generateText,
    options: textOptions,
    status: textStatus,
  } = useGenerate()

  const StepRenderer = props => {
    const { name } = props

    return (
      <>
        {name === 'start' && (
          <StepGetStarted
            {...props}
            options={headlineOptions}
            generate={generateHeadline}
            status={generationStatus}
            index={selectedHeadline}
            onSelect={setSelectedHeadline}
          />
        )}
        {name === 'text' && (
          <StepGenerateText
            {...props}
            options={textOptions}
            generate={generateText}
            status={textStatus}
            index={selectedText}
            onSelect={setSelectedText}
          />
        )}
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

  if (status === 'failed') {
    return (
      <>
        <NotFound />
        <Loading />
      </>
    )
  } else if (initializing) {
    return (
      <>
        <HeaderEdit />
        <Loading />
      </>
    )
  } else if (!user) {
    return (
      <Box
        position="relative"
        width="100%"
        display="flex"
        justifyContent="center"
        height={height}
        alignItems="center"
      >
        <Box pb={5}>
          <Verify id={id} />
        </Box>
      </Box>
    )
  } else {
    return (
      <>
        <HeaderEdit />
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
                      >
                        <StepRenderer
                          name={name}
                          answers={answers}
                          onNext={handleNext}
                          onBack={handleBack}
                          onAnswer={handleAnswer}
                          id={id}
                        />
                      </Box>
                    </Fade>
                  </Box>
                </Slide>
              </Box>
            )
          })}
        </Box>
      </>
    )
  }
}

export default EditRelease
