import React from 'react'
import { Grid } from '@mui/material'
import FormField from 'components/Form/FormField'

const Form = ({ formFields, submit, control, spacing }) => {
  const handleSubmit = e => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={spacing === 0 ? 0 : spacing || 3}>
        {formFields.map(formField => {
          const { name } = formField

          return (
            <Grid item xs={12} key={name}>
              <FormField formField={formField} control={control} />
            </Grid>
          )
        })}
      </Grid>
      <button type="submit" style={{ display: 'none' }} />
    </form>
  )
}

export default Form
