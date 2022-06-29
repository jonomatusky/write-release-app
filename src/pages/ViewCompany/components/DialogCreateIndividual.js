import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Box } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFieldsIndividual'
import { PersonAdd } from '@mui/icons-material'

const DialogCreateIndividual = ({ open, onClose, organization }) => {
  const navigate = useNavigate()
  const { create, createStatus } = useIndividualStore()

  const handleSubmit = async values => {
    values.organization = organization
    try {
      const individual = await create(values)
      navigate(`/profiles/${individual.id}`)
    } catch (err) {}
  }

  const formFields = [...getFields('basic')]

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: {
      city: organization.city,
      state: organization.state,
      country: organization.country,
    },
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          <PersonAdd />
          <Box pl={1}>Create New Profile</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={createStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} mt={1} mb={1}>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} submit={submit} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogCreateIndividual
