import React from 'react'
import * as Yup from 'yup'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'

const IndividualDialog = ({
  index,
  individual,
  submitIndividual,
  onRemove,
  open,
  onClose,
}) => {
  const handleSubmit = values => {
    if (!!index) {
      submitIndividual(index, values)
    } else {
      submitIndividual(values)
    }
  }

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      validation: Yup.string().required('Please enter a first name'),
    },
    {
      name: 'lastName',
      label: 'Last Name',
      validation: Yup.string().required('Please enter a last name'),
    },
    {
      name: 'title',
      label: 'Title',
      validation: Yup.string().required('Please enter a title'),
    },
    {
      name: 'company',
      label: 'Company',
      validation: Yup.string().required('Please enter a company'),
    },
  ]

  const initialValues = individual

  const { control, submit, reset } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
    initialValues,
  })

  const handleClose = () => {
    reset()
    onClose(null)
  }

  return (
    <LayoutDialogEdit
      title="Add Quoted Individual"
      open={open}
      onClose={handleClose}
      onSave={submit}
      closeLabel="Cancel"
      label="Save"
      onRemove={onRemove}
      disableBackdropClick={!!individual}
    >
      <Form control={control} submit={submit} formFields={formFields} />
    </LayoutDialogEdit>
  )
}

export default IndividualDialog
