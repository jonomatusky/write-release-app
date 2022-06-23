import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import useOrganizationStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'
import { getFields } from 'util/formFieldsOrganization'
import ButtonDeleteOrganization from './ButtonDeleteOrganization'

const DialogEditSettings = ({ open, onClose }) => {
  const { update, updateStatus, select } = useOrganizationStore()
  const { id } = useParams()
  const organization = select(id)

  const formFields = getFields('settings')

  const handleSubmit = async values => {
    try {
      await update({ id, ...values })
      onClose()
    } catch (err) {}
  }

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
      title="Edit Settings"
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pt={2}>
        <Grid item xs={12}>
          <Form
            control={control}
            submit={submit}
            formFields={formFields}
            initialValues={organization}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <ButtonDeleteOrganization id={id} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditSettings
