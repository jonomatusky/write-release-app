import React from 'react'
import useTonesStore from 'hooks/store/use-tones-store'
import TemplateStepList from './TemplateStepList'

const StepType = ({ onAnswer, answers, onNext, onBack, name }) => {
  const { items } = useTonesStore()

  const sorted = [...items].sort((a, b) => {
    return b.displayName.toLowerCase() - a.displayName.toLowerCase()
  })

  return (
    <TemplateStepList
      label="What kind of tone are you going for?"
      options={sorted}
      primaryField="displayName"
      searchFields={['displayName', 'name', 'aliases']}
      onAnswer={onAnswer}
      value={answers[name]}
      onNext={onNext}
      onBack={onBack}
      name={name}
    />
  )
}

export default StepType
