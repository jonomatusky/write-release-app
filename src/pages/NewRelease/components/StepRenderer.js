import React from 'react'
import StepGetStarted from './StepGetStarted'
import StepType from './StepType'
import StepTone from './StepTone'
import StepWho from './StepWho'
import StepWhere from './StepWhere'
import StepEmail from './StepEmail'
import StepBreakLongQuestions from './StepBreakLongQuestions'
import TemplateLongQuestion from './TemplateLongQuestion'
import StepQuoted from './StepQuoted'
import StepHaveBoilerplate from './StepHaveBoilerplate'
import useContentStore from 'hooks/store/use-content-store'
import { useNavigate } from 'react-router'
import useContentTypesStore from 'hooks/store/use-content-types-store'

const StepRenderer = props => {
  const { name, answers, request } = props

  const { create } = useContentStore()
  const navigate = useNavigate()

  const { select } = useContentTypesStore()
  const contentType = select(answers.type) || {}
  const { summary, significance, fit } = contentType

  const handleSubmitEmail = async values => {
    try {
      await request({
        quiet: true,
        url: '/leads',
        method: 'post',
        data: {
          email: values.tempUserEmail,
        },
      })
    } catch (err) {}
  }

  const handleCreate = async values => {
    const answersToSubmit = { ...answers, ...values }
    try {
      const newRelease = await create(answersToSubmit)
      if (newRelease) {
        navigate(`/releases/${newRelease.id}`)
      }
    } catch (err) {}
  }

  return (
    <>
      {name === 'start' && <StepGetStarted {...props} />}
      {name === 'type' && <StepType {...props} />}
      {name === 'tone' && <StepTone {...props} />}
      {name === 'subject' && <StepWho {...props} />}
      {name === 'location' && <StepWhere {...props} />}
      {name === 'verify' && (
        <StepEmail {...props} onSubmitEmail={handleSubmitEmail} />
      )}
      {name === 'startLongQuestions' && <StepBreakLongQuestions {...props} />}
      {name === 'summary' && (
        <TemplateLongQuestion
          name="summary"
          subtitle="What's the main story? What are the key points?"
          placeholder="Write a short summary of the release. The more detail, the better."
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
          placeholder="Tell us why this matters, with an emphasis on the reader."
          value={answers.significance}
          {...significance}
          label="Why does it matter?"
          {...props}
        />
      )}
      {name === 'fit' && (
        <TemplateLongQuestion
          name="fit"
          subtitle="Is it a new direction? A first for the company? A continuation of its ongoing mission?"
          placeholder="Tell us how this fits in. Readers want to know about the overall story."
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
          onNext={handleCreate}
          name={!!answers.hasBoilerplate ? 'boilerplate' : 'aboutCompany'}
        />
      )}
    </>
  )
}

export default StepRenderer
