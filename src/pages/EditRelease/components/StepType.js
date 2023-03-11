import React from 'react'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import TemplateStepList from './TemplateStepList'

const StepType = ({ onAnswer, answers, onNext, onBack, name }) => {
  const { items } = useContentTypesStore()

  const pressReleaseTypes = (items || []).filter(
    item => item.primary === 'Press Release'
  )
  const sorted = [...pressReleaseTypes].sort((a, b) => {
    return b.secondary - a.secondary
  })

  return (
    <TemplateStepList
      label="What type of press release are you working on?"
      options={sorted}
      primaryField="secondary"
      searchFields={['secondary', 'aliases']}
      onAnswer={onAnswer}
      value={answers[name]}
      onNext={onNext}
      onBack={onBack}
      name={name}
    />
  )
}

export default StepType
