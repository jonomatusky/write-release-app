import React, { useState } from 'react'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import FormCreateContent from './FormEditContent'
import useFormHelper from 'hooks/use-form-helper'
import useQuestionsStore from 'hooks/store/use-questions-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import { useNavigate } from 'react-router'

const DialogContentQuestions = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const content = select(id)
  const navigate = useNavigate()

  const handleRemove = async () => {
    try {
      update({ id, isRemoved: true })
      navigate('/content')
    } catch (err) {
      console.log(err)
    }
  }

  const [state, setState] = useState({
    individualsHired: content.individualsHired || [],
    individualsQuoted: content.individualsQuoted || [],
    individualsMentioned: content.individualsMentioned || [],
  })

  const {
    items: allQuestions,
    select: selectQuestion,
    fetchStatus: fetchQuestionsStatus,
  } = useQuestionsStore()
  const { select: selectContentType, fetchStatus: fetchContentTypesStatus } =
    useContentTypesStore()

  const contentType = selectContentType(content.type)

  const organizationId = content.organizations[0]

  let questions =
    contentType.questions?.map(question => {
      const q = selectQuestion(question)
      const newQ = { ...q, name: q.id }
      return newQ
    }) || []

  if (questions.length === 0) {
    questions = allQuestions.map(q => {
      const newQ = { ...q, name: q.id }
      return newQ
    })
  }

  const formFields = questions.filter(question => question.type === 'textarea')

  // console.log(content.answers)
  // console.log(content.answers?.map(answer => answer.question))
  // console.log(content.answers?.map(answer => answer.answer))

  const initialValues = content.answers?.reduce(
    (acc, answer) => ({ ...acc, [answer.question]: answer.answer }),
    {}
  )

  const handleSubmit = async values => {
    const answers = Object.keys(values).map(key => ({
      question: key,
      answer: values[key],
    }))

    const individuals = Object.values(state)
      .reduce((acc, item) => [...acc, ...item], [])
      .filter((item, index, self) => self.indexOf(item) === index)

    const newContent = { ...content, ...state, individuals, answers }

    try {
      await update({ id, ...newContent })
      onClose()
    } catch (err) {}
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <LayoutDialogEdit
      title="Content Info"
      open={open}
      onClose={handleClose}
      onSave={submit}
      onRemove={handleRemove}
      loading={updateStatus === 'loading'}
    >
      {fetchQuestionsStatus === 'succeeded' &&
        fetchContentTypesStatus === 'succeeded' && (
          <FormCreateContent
            control={control}
            submit={submit}
            formFields={formFields}
            state={state}
            setState={setState}
            contentType={contentType}
            organizationId={organizationId}
          />
        )}
    </LayoutDialogEdit>
  )
}

export default DialogContentQuestions
