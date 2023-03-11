import useContentTypesStore from 'hooks/store/use-content-types-store'
import useQuestionsStore from 'hooks/store/use-questions-store'
import React from 'react'
import TemplateLongQuestion from './TemplateLongQuestion'

const StepMatter = ({ onNext, onBack, answers, onAnswer }) => {
  const contentTypeId = answers.type
  const { select } = useContentTypesStore()
  const { items: questions } = useQuestionsStore()
  const contentType = select(contentTypeId)

  const qIndex = 1
  const name = 'significance'

  const question = questions.find(item => item.key === name) || {}
  const { summaryQuestion } = contentType || {}
  const { label, subtitle } = summaryQuestion || {}

  const handleAnswer = values => {
    onAnswer(values)
  }

  return (
    <TemplateLongQuestion
      label={label || question.label || `What's this release about?`}
      subtitle={
        subtitle ||
        question.subtitle ||
        "What's the main story? What are the key points?"
      }
      // placeholder="Acme Corp"
      onNext={onNext}
      onBack={onBack}
      onAnswer={handleAnswer}
      value={answers.questions[qIndex]}
      name={name}
      showSkip
    />
  )
}

export default StepMatter
