import React from 'react'
import { Grid } from '@mui/material'

import useOrganizationStore from 'hooks/store/use-organizations-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import { getFields } from 'util/formFieldsOrganization'

const DialogOrganizationBackground = ({ id, open, onClose }) => {
  const { select, update, updateStatus } = useOrganizationStore()
  const organization = select(id)

  const handleSubmit = async values => {
    try {
      await update({ id, ...values })
    } catch (err) {
      console.log(err)
    }
  }

  const formFields = getFields('content')

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: organization || [],
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

export default DialogOrganizationBackground
