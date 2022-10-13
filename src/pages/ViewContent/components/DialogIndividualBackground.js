import React from 'react'
import { Grid } from '@mui/material'

import useIndividualStore from 'hooks/store/use-individuals-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'

const DialogIndividualBackground = ({ id, open, onClose }) => {
  const { select, update, updateStatus } = useIndividualStore()
  const individual = select(id)

  const handleSubmit = async values => {
    try {
      await update({ id, ...values })
    } catch (err) {
      console.log(err)
    }
  }

  const formFields = [
    {
      name: 'experience',
      label: 'Previous Experience',
      type: 'textarea',
    },
    {
      name: 'education',
      label: 'Education',
      type: 'textarea',
    },
    {
      name: 'notes',
      label: 'Other relevant information',
      type: 'textarea',
      placeholder: 'Home town, hobbies, family, etc.',
    },
  ]

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: individual || [],
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSave = () => {
    submit()
    onClose()
  }

  return (
    <LayoutDialogEdit
      title="Edit Basic Info"
      open={open}
      onClose={handleClose}
      onSave={handleSave}
      loading={updateStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} pt={2}>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} submit={submit} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogIndividualBackground
