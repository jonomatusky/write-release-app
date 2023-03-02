import React from 'react'
import TemplateSingleQuestion from './TemplateSingleQuestion'

const StepWho = ({ onNext, onBack, answers, onAnswer, name }) => {
  return (
    <TemplateSingleQuestion
      label="Who is this release about?"
      subtitle="Your company, client, etc."
      placeholder="Acme Corp"
      onNext={onNext}
      onBack={onBack}
      onAnswer={onAnswer}
      value={answers[name]}
      name={name}
      required
    />
  )
}

export default StepWho
