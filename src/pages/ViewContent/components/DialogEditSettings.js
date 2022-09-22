import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'
import { getFields } from 'util/formFieldsIndividual'
import ButtonDeleteIndividual from './ButtonDeleteIndividual'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const DialogEditSettings = ({ open, onClose }) => {
  const { update, updateStatus, select } = useIndividualStore()
  const { select: selectOrganization } = useOrganizationsStore()
  const { id } = useParams()
  const individual = select(id)
  const { organization } = individual || {}

  const org = selectOrganization(organization)
  const { email } = org || {}

  let formFields = getFields('settings')
  formFields[formFields.findIndex(f => f.name === 'email')].placeholder = email

  const handleSubmit = async values => {
    try {
      await update({ id, ...values })
      onClose()
    } catch (err) {}
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: individual,
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
            initialValues={individual}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <ButtonDeleteIndividual id={id} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditSettings
