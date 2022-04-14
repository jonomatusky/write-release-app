import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import AvatarToEdit from './AvatarToEdit'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFields'

const BasicInfoDialog = ({ open, onClose }) => {
  const { update, select, updateStatus } = useIndividualStore()
  const { pid } = useParams()
  const individual = select(pid)
  const formFields = getFields('basic')

  const updateImage = imageFilepath => {
    update({ id: pid, avatar: imageFilepath })
  }

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
      title="Edit Basic Info"
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2}>
        <Grid item xs={12}>
          <AvatarToEdit id={pid} updateImage={updateImage} />
        </Grid>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default BasicInfoDialog
