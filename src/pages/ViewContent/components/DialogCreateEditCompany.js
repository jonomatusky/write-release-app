import React from 'react'
import { Grid, Box } from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
// import { getFields } from 'util/formFieldsOrganization'
import { DomainAdd, Edit } from '@mui/icons-material'
import useFormFieldsOrganization from 'hooks/use-form-fields-organization'

const DialogCreateEditCompany = ({ open, onClose, onSubmit, organization }) => {
  const { create, update, createStatus } = useOrganizationsStore()

  const handleSubmit = async values => {
    try {
      let newIndividual = !!organization
        ? await update({ id: organization.id, ...values })
        : await create({ ...values, isPrivate: true })

      !!onSubmit && onSubmit(newIndividual.id)
      onClose && onClose()
    } catch (err) {}
  }

  const { getFields } = useFormFieldsOrganization()
  const formFields = [...getFields('basic')]

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: organization,
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
          {!!organization ? <Edit /> : <DomainAdd />}
          <Box pl={1}>
            {!!organization ? `Update Company` : `Create New Company`}
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

export default DialogCreateEditCompany
