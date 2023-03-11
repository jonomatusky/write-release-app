import useContentTypesStore from 'hooks/store/use-content-types-store'
import useQuestionsStore from 'hooks/store/use-questions-store'
import React from 'react'
import TemplateLongQuestion from './TemplateLongQuestion'

const StepSummary = ({ onNext, onBack, answers, onAnswer }) => {
  const contentTypeId = answers.type
  const { select } = useContentTypesStore()
  const { items: questions } = useQuestionsStore()
  const contentType = select(contentTypeId)

  const qIndex = 0
  const name = 'summary'

  const question = questions.find(item => item.key === name) || {}
  const questionId = question.id
  const { summaryQuestion } = contentType || {}
  const { label, subtitle } = summaryQuestion || {}

  console.log(questions)

  const handleAnswer = values => {
    const newAnswers = answers.answers || []
    newAnswers[qIndex] = {
      question: questionId,
      answer: values[name],
    }

    onAnswer({ answers: newAnswers })
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
      value={(answers.answers || {})[qIndex]?.answer || ''}
      name={name}
      showSkip
    />
  )
}

export default StepSummary
