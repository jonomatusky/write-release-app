import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'
import { getFields } from 'util/formFields'
import ButtonDeleteIndividual from './ButtonDeleteIndividual'

const DialogEditSettings = ({ open, onClose }) => {
  const { update, updateStatus, select } = useIndividualStore()
  const { pid } = useParams()
  const individual = select(pid)

  const formFields = getFields('settings')

  const handleSubmit = async values => {
    try {
      await update({ id: pid, ...values })
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
            onSubmit={submit}
            formFields={formFields}
            initialValues={individual}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <ButtonDeleteIndividual id={pid} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditSettings
