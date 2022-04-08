import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Grid } from '@mui/material'
import AvatarToEdit from './AvatarToEdit'
import useIndividualStore from 'hooks/store/individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const BasicInfoDialog = ({ open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { id } = useParams
  const individual = select(id)

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Joe',
      type: 'text',
      validation: Yup.string()
        .required('First name is required')
        .max(50, 'Must be under 50 characters'),
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Shmoe',
      type: 'text',
      validation: Yup.string()
        .required('Last name is required')
        .max(50, 'Must be under 50 characters'),
    },
    {
      name: 'title',
      label: 'Title',
      placeholder: 'CEO',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'company',
      label: 'Company',
      placeholder: 'ACME',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'companyUrl',
      label: 'Company Website',
      placeholder: 'https://acme.com',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(100, 'Must be under 100 characters'),
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'Metropolis',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'state',
      label: 'State',
      placeholder: 'DE',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'country',
      label: 'Country',
      placeholder: 'USA',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
        { label: 'Other', value: 'other' },
      ],
    },
  ]

  const updateImage = imageFilepath => {
    update({ avatar: imageFilepath })
  }

  const { control, submit } = useFormHelper({
    formFields,
    initialValues: individual,
    onSubmit: update,
  })

  return (
    <LayoutDialogEdit
      title="Edit Basic Info"
      open={open}
      onClose={onClose}
      onSave={submit}
    >
      <Grid container spacing={2} justifyContent="center" pb={2}>
        <Grid item xs={12}>
          <AvatarToEdit avatar={individual.avatar} updateImage={updateImage} />
        </Grid>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default BasicInfoDialog
