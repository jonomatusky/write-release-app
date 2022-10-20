import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import FormField from 'components/Form/FormField'

const Form = ({
  formFields,
  submit,
  control,
  watch,
  conditionalField,
  conditionalValue,
  spacing,
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    submit()
  }

  let showField = true

  if (!!watch && !!conditionalField && !!conditionalValue) {
    showField = watch(conditionalField) === conditionalValue
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={spacing === 0 ? 0 : spacing || 3}>
        {!!formFields &&
          formFields.map(formField => {
            const { name } = formField

            if (showField) {
              return (
                <Grid item xs={12} key={name}>
                  <FormField {...formField} control={control} />
                </Grid>
              )
            } else {
              return <Fragment key={name}></Fragment>
            }
          })}
      </Grid>
      <button type="submit" style={{ display: 'none' }} />
    </form>
  )
}

export default Form
