import React from 'react'
import * as Yup from 'yup'
import { Edit, PriorityHigh } from '@mui/icons-material'
import { Button, Box, Typography } from '@mui/material'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'

const ItemQuotedIndividual = ({
  index,
  individual,
  submitIndividual,
  onRemove,
  isEditing,
  setIsEditing,
}) => {
  const { firstName, lastName, title, company } = individual

  const handleSubmit = values => {
    submitIndividual(index, values)
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

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
    initialValues,
  })

  const isError = !firstName || !lastName || !title || !company

  return (
    <>
      <LayoutDialogEdit
        title="Add Quoted Individual"
        open={isEditing}
        onClose={() => setIsEditing(null)}
        onSave={submit}
        closeLabel="Cancel"
        label="Save"
        onRemove={onRemove}
        disableBackdropClick
      >
        <Form control={control} submit={submit} formFields={formFields} />
      </LayoutDialogEdit>
      <Button
        variant="outlined"
        color={isError ? 'warning' : 'secondary'}
        fullWidth
        onClick={() => setIsEditing(index)}
        size="large"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            <Typography variant="h6" component="span">
              <b>{firstName ? firstName + ' ' + lastName : 'No Name'}</b>
            </Typography>
          </Box>
          {isError ? <PriorityHigh /> : <Edit />}
        </Box>
      </Button>
    </>
  )
}

export default ItemQuotedIndividual
