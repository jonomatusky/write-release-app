import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import * as Yup from 'yup'
import GridButtons from './GridButtons'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'

const TemplateSingleQuestion = ({
  label,
  subtitle,
  onAnswer,
  value,
  onNext,
  onBack,
  showSkip,
  required,
  placeholder,
  name,
}) => {
  const handleAnswer = values => {
    try {
      onAnswer(values)
      onNext()
    } catch (err) {}
  }

  let validation = Yup.string().max(100, 'Must be under 100 characters')

  if (required) {
    validation = validation.required('Please enter a subject')
  }

  const formFields = [
    {
      name,
      placeholder,
      validation,
      autoFocus: true,
    },
  ]

  const initialValues = {
    [name]: value,
  }

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleAnswer,
    initialValues,
  })

  return (
    <Box width="100%">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom>
            {label} {required && '*'}
          </Typography>
          {subtitle && (
            <Typography variant="body1" component="p" gutterBottom>
              {subtitle}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Form control={control} formFields={formFields} submit={submit} />
        </Grid>
        <Grid item xs={12}>
          <GridButtons onNext={submit} onBack={onBack} showSkip={showSkip} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TemplateSingleQuestion
