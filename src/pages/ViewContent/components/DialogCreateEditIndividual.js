import React from 'react'
import { Grid, Box } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFieldsIndividual'
import { Edit, PersonAdd } from '@mui/icons-material'

const DialogCreateEditIndividual = ({
  open,
  onClose,
  onSubmit,
  individual,
  organizationId,
}) => {
  const { select } = useOrganizationsStore()
  const { create, update, createStatus } = useIndividualStore()

  const handleSubmit = async values => {
    values.organization = organizationId

    try {
      let newIndividual = !!individual
        ? await update({ id: individual.id, values })
        : await create(values)

      !!onSubmit && onSubmit(newIndividual.id)
      onClose && onClose()
    } catch (err) {}
  }

  const formFields = [...getFields('basic')]

  const organization = select(organizationId)

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: !!individual
      ? individual
      : {
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
          {!!individual ? <Edit /> : <PersonAdd />}
          <Box pl={1}>
            {!!individual ? `Update Profile` : `Create New Profile`}
          </Box>
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

export default DialogCreateEditIndividual
