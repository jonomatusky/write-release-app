import React from 'react'
import { Grid, Box } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useQuestionsStore from 'hooks/store/use-questions-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const DialogSubject = ({ open, onClose, id }) => {
  const { update, updateStatus, select: selectContent } = useContentStore()
  const { items: questions, select: selectQuestion } = useQuestionsStore()

  const content = selectContent(id)

  const { setupStage } = content
  const isSetup = setupStage === 'subject'

  let formFields =
    questions.filter(question => {
      const { isDefault, section, contentTypes } = question || {}

      return (
        (isDefault && section === 'subject') ||
        contentTypes.includes(content.type)
      )
    }) || []

  if (formFields.length === 0) {
    formFields =
      questions.filter(question => {
        const { isGeneric, section, contentTypes } = question || {}
        return (
          (isGeneric && section === 'subject') ||
          contentTypes.includes(content.type)
        )
      }) || []
  }

  const initialValues = content.answers?.reduce(
    (acc, answer) => ({ ...acc, [answer.question]: answer.answer }),
    {}
  )

  const handleSubmit = async values => {
    const answers = [...content.answers]

    const newAnswers = Object.keys(values).map(key => ({
      question: key,
      answer: values[key],
    }))

    newAnswers.forEach(newAnswer => {
      const index = answers.findIndex(
        answer => answer.question === newAnswer.question
      )
      if (index > -1) {
        answers[index] = newAnswer
      } else {
        answers.push(newAnswer)
      }
    })

    answers.sort(
      (a, b) =>
        selectQuestion(a.question).order - selectQuestion(b.question).order
    )

    const newSetupStage = !isSetup ? null : 'background'

    try {
      await update({ id, answers, setupStage: newSetupStage })
      onClose()
    } catch (err) {}
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    isSetup &&
      (await update({
        id,
        setupStage: 'background',
      }))
    reset()
    onClose()
  }

  const onBack = async () => {
    isSetup &&
      (await update({
        id,
        setupStage: 'resources',
      }))
    reset()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* <NoteAdd /> */}
          <Box pl={1}>Subject</Box>
        </Box>
      }
      open={open || isSetup}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
      label={isSetup ? 'Next' : 'Save'}
      cancelLabel={isSetup ? 'Skip' : 'Cancel'}
      onBack={isSetup ? onBack : null}
    >
      <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
        <Grid item xs={12}>
          <Form formFields={formFields} submit={submit} control={control} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogSubject
