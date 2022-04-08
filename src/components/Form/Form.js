import React from 'react'
import { Grid } from '@mui/material'
import FormField from 'components/Form/FormField'

const Form = ({ formFields, onSubmit, control }) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {formFields.map(formField => {
          const { name } = formField

          return (
            <Grid item xs={12} key={name}>
              <FormField formField={formField} control={control} />
            </Grid>
          )
        })}
      </Grid>
    </form>
  )
}

export default Form
