import React from 'react'
import { Box, Grid } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import useQuestionsStore from 'hooks/store/use-questions-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import Form from 'components/Form/Form'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import DialogCreateIndividual from './DialogCreateEditIndividual'

const DialogAuthor = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const { items: individuals } = useIndividualsStore()
  const content = select(id)

  const { setupStage } = content
  const isSetup = setupStage === 'quotes'

  const organizationId = ((content || {}).organizations || [])[0]

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
      label: `Who are the authors of this piece?`,
      name: 'individualsBy',
      options: individualsOptions || [],
      type: 'auto-multi',
      AddDialog: DialogCreateIndividual,
      addDialogProps: { organizationId },
    },
  ]

  console.log(content)

  const handleSubmit = async values => {
    const individuals = [
      ...values.individualsBy,
      ...content.individualsQuoted,
      ...content.individualsMentioned,
      ...content.individualsSubjects,
    ].filter((item, index, self) => self.indexOf(item) === index)

    const newContent = {
      id,
      ...values,
      individuals,
      setupStage: null,
    }

    try {
      await update(newContent)
      await onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: content,
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    isSetup &&
      (await update({
        id,
        setupStage: null,
      }))
    reset()
    onClose()
  }

  // const individualsBy = watch('individualsBy') || []

  const onBack = async () => {
    isSetup &&
      (await update({
        id,
        setupStage: 'subject',
      }))
    reset()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* <Edit /> */}
          <Box pl={1}>Quotes</Box>
        </Box>
      }
      open={open || isSetup}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
      label={isSetup ? 'Done' : 'Save'}
      cancelLabel={isSetup ? 'Skip' : 'Cancel'}
      onBack={isSetup ? onBack : null}
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
              {/* <Grid item xs={12}>
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
                          <IndividualPanel
                            id={individualId}
                            hideTags
                            onClick={() => {}}
                            // onSubmit={values =>
                            //   handleSubmitIndividual({
                            //     id: individualId,
                            //     ...values,
                            //   })
                            // }
                          />
                        </Collapse>
                      )
                    })}
                </TransitionGroup>
              </Grid> */}
            </Grid>
          </Box>
        )}
    </LayoutDialogEdit>
  )
}

export default DialogAuthor
