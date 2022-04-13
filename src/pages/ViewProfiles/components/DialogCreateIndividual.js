import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFields'

const DialogCreateIndividual = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { create, createStatus } = useIndividualStore()

  const handleSubmit = async values => {
    console.log(values)
    try {
      const individual = await create(values)
      navigate(`/profiles/${individual.id}`)
    } catch (err) {}
  }

  const formFields = [...getFields('basic'), ...getFields('settings')]

  const { control, submit, reset } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <LayoutDialogEdit
      title="Create New Profile"
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={createStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} mt={1} mb={1}>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogCreateIndividual
