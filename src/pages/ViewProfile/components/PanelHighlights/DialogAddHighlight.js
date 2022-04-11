import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { useRequest } from 'hooks/use-request'

const DialogAddHighlight = ({ index, open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { request, status } = useRequest()
  const { id } = useParams()
  const individual = select(id)
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
  ]

  const handleSubmit = async values => {
    const { url } = values
    let highlight = { url }

    try {
      const { siteInfo } = await request({ urls: [url] })
      Object.assign(highlight, siteInfo)
    } catch (err) {
      console.log(err)
    }

    const newHighlights = [...highlights]
    newHighlights[index] = values

    console.log(highlights)

    update({ id, highlights: newHighlights })
    onClose()
  }

  const { control, submit } = useFormHelper({
    formFields,
    initialValues: { url: '' },
    onSubmit: handleSubmit,
  })

  return (
    <LayoutDialogEdit
      title="Edit Basic Info"
      open={open}
      onClose={onClose}
      onSave={submit}
      loading={status === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} pt={2}>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogAddHighlight
