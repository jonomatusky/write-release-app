import useRequest from 'hooks/use-request'
import { useEffect } from 'react'

const useGenerateAnswers = ({ questions, id, setValue }) => {
  const { request, status } = useRequest({})

  const generateAnswers = async (questions, id) => {
    try {
      const res = await request({
        url: '/generator/answers',
        method: 'POST',
        data: {
          contentId: id,
          questions: questions,
        },
      })

      const data = res?.data

      const answers = data?.answers

      return answers
    } catch (err) {}
  }

  const setAnswers = (questions, answers, setValue) => {
    if (answers && answers.length > 0) {
      questions.forEach((question, index) => {
        setValue(question.id, answers[index])
      })
    }
  }
}

export default useGenerateAnswers
