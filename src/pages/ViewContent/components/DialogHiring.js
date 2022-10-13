import React from 'react'
import { Box, Collapse, Grid } from '@mui/material'
import * as Yup from 'yup'
import { TransitionGroup } from 'react-transition-group'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import useQuestionsStore from 'hooks/store/use-questions-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import Form from 'components/Form/Form'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import IndividualPanel from './IndividualPanel'
import DialogCreateIndividual from './DialogCreateEditIndividual'

const DialogHiring = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const { items: individuals, fetchStatus: fetchIndividualsStatus } =
    useIndividualsStore()
  const content = select(id)

  const organizationId = ((content || {}).organizations || [])[0]

  const { setupStage } = content
  const isSetup = setupStage === 'hiring'

  const individualsOptions = individuals.filter(
    individual => individual.organization === organizationId
  )

  const {
    items: allQuestions,
    select: selectQuestion,
    fetchStatus: fetchQuestionsStatus,
  } = useQuestionsStore()
  const { select: selectContentType, fetchStatus: fetchContentTypesStatus } =
    useContentTypesStore()

  const contentType = selectContentType(content.type)

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

  const formFields = [
    {
      label: `Who is/are the new hire(s)?`,
      name: 'individualsSubjects',
      options: individualsOptions || [],
      type: 'auto-multi',
      validation: Yup.array().min(1, 'Please select at least one person'),
      AddDialog: DialogCreateIndividual,
      addDialogProps: { organizationId },
    },
  ]

  const handleSubmit = async values => {
    const individuals = [
      ...hiredIndividuals,
      ...(content.individualsQuoted || []),
      ...(content.IndividualsMentioned || []),
    ].filter((item, index, self) => self.indexOf(item) === index)

    const newContent = {
      id,
      ...values,
      hiredIndividuals,
      individuals,
      setupStage: isSetup ? 'subject' : null,
    }

    try {
      await update(newContent)
      await onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset, watch } = useFormHelper({
    formFields,
    initialValues: content,
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    isSetup &&
      (await update({
        id,
        setupStage: 'quotes',
      }))
    reset()
    onClose()
  }

  const hiredIndividuals = watch('individualsSubjects') || []

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* <Edit /> */}
          <Box pl={1}>
            {contentType.secondary === 'New Hire' ? 'New Hire' : 'Appointment'}
          </Box>
        </Box>
      }
      open={open || isSetup}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
      label={isSetup ? 'Next' : 'Save'}
      cancelLabel={isSetup ? 'Skip' : 'Cancel'}
    >
      {fetchQuestionsStatus === 'succeeded' &&
        fetchContentTypesStatus === 'succeeded' && (
          <Box display="flex">
            <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
              <Grid item xs={12}>
                <Form
                  submit={submit}
                  control={control}
                  formFields={formFields}
                />
              </Grid>
              <Grid item xs={12}>
                <TransitionGroup>
                  {fetchIndividualsStatus === 'succeeded' &&
                    hiredIndividuals.map(individualId => {
                      return (
                        <Collapse
                          orientation="vertical"
                          component={Grid}
                          item
                          xs={12}
                          pb={1}
                          key={individualId}
                        >
                          <IndividualPanel id={individualId} />
                        </Collapse>
                      )
                    })}
                </TransitionGroup>
              </Grid>
            </Grid>
          </Box>
        )}
    </LayoutDialogEdit>
  )
}

export default DialogHiring
