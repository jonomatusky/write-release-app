import React from 'react'
import TemplateSingleQuestion from './TemplateSingleQuestion'

const StepWhere = ({ onNext, onBack, answers, onAnswer, name }) => {
  return (
    <TemplateSingleQuestion
      label="Where is the release being published?"
      subtitle="Usually the city you're based in. We’ll include this at the start of the release."
      placeholder="Philadelphia, PA"
      onNext={onNext}
      onBack={onBack}
      onAnswer={onAnswer}
      value={answers[name]}
      name={name}
    />
  )
}

export default StepWhere
