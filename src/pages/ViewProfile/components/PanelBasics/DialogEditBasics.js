import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Grid } from '@mui/material'
import AvatarToEdit from './AvatarToEdit'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const BasicInfoDialog = ({ open, onClose }) => {
  const { update, select, updateStatus } = useIndividualStore()
  const { pid } = useParams()
  const individual = select(pid)

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
    // {
    //   name: 'gender',
    //   label: 'Gender',
    //   type: 'select',
    //   options: [
    //     { label: 'Female', value: 'female' },
    //     { label: 'Male', value: 'male' },
    //     { label: 'Other', value: 'other' },
    //   ],
    // },
  ]

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
