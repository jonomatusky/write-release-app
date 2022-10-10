import React, { useState } from 'react'
import { Box, Collapse, Grid } from '@mui/material'
import * as Yup from 'yup'
import { TransitionGroup } from 'react-transition-group'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import FormCreateContent from './FormEditContent'
import useFormHelper from 'hooks/use-form-helper'
import useQuestionsStore from 'hooks/store/use-questions-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import { useNavigate } from 'react-router'
import { Edit } from '@mui/icons-material'
import Form from 'components/Form/Form'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import Autocompleter from 'components/Autocompleter'
import IndividualPanel from './IndividualPanel'

const DialogContentQuestions = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const {
    items: individuals,
    fetchStatus: fetchIndividualsStatus,
    update: updateIndividual,
  } = useIndividualsStore()
  const content = select(id)
  const navigate = useNavigate()

  const individualsOptions = individuals.filter(
    individual => individual.organization === content.organization
  )

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

  // const formFields = questions.filter(question => question.type === 'textarea')

  const formFields = [
    // {
    //   label: 'What type of press are you writing?',
    //   name: 'contentType',
    //   options:
    //     contentTypes.map(contentType => ({
    //       ...contentType,
    //       name: contentType.secondary,
    //     })) || [],
    //   type: 'auto',
    //   validation: Yup.string().required('Type is required'),
    // },
    {
      label: `Who is/are the new hire(s)?`,
      name: 'individualsSubjects',
      options: individualsOptions || [],
      type: 'auto-multi',
      validation: Yup.array().required('Please select at least one person'),
    },
    // {
    //   label: `Who else should be quoted in this release?`,
    //   name: 'individualsQuoted',
    //   options: individualsOptions || [],
    //   type: 'auto-multi',
    // },
    // {
    //   label: 'When is this release going out?',
    //   name: 'date',
    //   type: 'date',
    // },
    // {
    //   label: `What's the target audience for this release?`,
    //   name: 'audiences',
    //   options: audienceOptions,
    //   type: 'auto',
    // },
    // {
    //   label: `What's the tone of this release?`,
    //   name: 'tone',
    //   options: toneOptions,
    //   type: 'auto',
    // },
  ]

  const initialValues = content.answers?.reduce(
    (acc, answer) => ({ ...acc, [answer.question]: answer.answer }),
    {}
  )

  const handleSubmitIndividual = async values => {
    updateIndividual(values)
  }

  const handleSubmit = async values => {
    // const answers = Object.keys(values).map(key => ({
    //   question: key,
    //   answer: values[key],
    // }))

    // const individuals = Object.values(state)
    //   .reduce((acc, item) => [...acc, ...item], [])
    //   .filter((item, index, self) => self.indexOf(item) === index)

    const newContent = { hiredIndividuals, individuals: hiredIndividuals }

    try {
      for (let i=0hiredIndividual in hiredIndividuals) {
        updateIndividual(hiredIndividual)
      }
      update(newContent)
      onClose()
    } catch (err) {
      console.log(err)
    }

    try {
      await update({ id, ...newContent })
      await onClose()
    } catch (err) {}
  }

  const { control, submit, reset, watch } = useFormHelper({
    formFields,
    // initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  const hiredIndividuals = watch('individualsSubjects') || []

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          <Edit />
          <Box pl={1}>Background</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={submit}
      onRemove={handleRemove}
      loading={updateStatus === 'loading'}
    >
      {fetchQuestionsStatus === 'succeeded' &&
        fetchContentTypesStatus === 'succeeded' && (
          <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
            {/* <Grid item xs={12}>
              <Autocompleter
                label="Who's being hired?"
                name="individualsSubjects"
                value={individualsSubjects}
                onChange={() => setIndividualsSubjects()}
                options={individualsOptions}
                multi
              />
            </Grid> */}
            <Grid item xs={12}>
              <Form submit={submit} control={control} formFields={formFields} />
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
                        <IndividualPanel
                          id={individualId}
                          hideTags
                          onClick={() => {}}
                          onSubmit={values =>
                            handleSubmitIndividual({
                              id: individualId,
                              ...values,
                            })
                          }
                        />
                      </Collapse>
                    )
                  })}
              </TransitionGroup>
            </Grid>
          </Grid>
          // <FormCreateContent
          //   control={control}
          //   submit={submit}
          //   formFields={formFields}
          //   state={state}
          //   setState={setState}
          //   contentType={contentType}
          //   organizationId={organizationId}
          // />
        )}
    </LayoutDialogEdit>
  )
}

export default DialogContentQuestions
