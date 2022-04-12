import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const DialogEditHighlights = ({ index, open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { pid } = useParams()
  const individual = select(pid)
  const highlights = individual.highlights || []

  const formFields = [
    {
      name: 'url',
      label: 'Link',
      placeholder: 'https://www...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(200, 'Must be under 200 characters'),
    },
    {
      name: 'title',
      label: 'Headline',
      placeholder: 'Great News Everyone!',
      type: 'text',
      validation: Yup.string()
        .required('Last name is required')
        .max(100, 'Must be under 100 characters'),
    },
    {
      name: 'outlet',
      label: 'Outlet',
      placeholder: 'News Site',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'image',
      label: 'Link to Image',
      placeholder: 'https://drive.google.com/...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(250, 'Must be under 250 characters'),
    },
  ]

  const handleSubmit = async values => {
    const newHighlights = [...highlights]
    newHighlights[index] = values

    update({ id: pid, highlights: newHighlights })
    onClose()
  }

  const handleDelete = () => {
    const newHighlights = [...highlights]
    newHighlights.splice(index, 1)

    update({ id: pid, highlights: newHighlights })
    onClose()
  }

  const { control, submit } = useFormHelper({
    formFields,
    initialValues: highlights[index],
    onSubmit: handleSubmit,
  })

  return (
    <LayoutDialogEdit
      title="Edit Basic Info"
      open={open}
      onClose={onClose}
      onSave={submit}
      onRemove={handleDelete}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} pt={2}>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditHighlights
