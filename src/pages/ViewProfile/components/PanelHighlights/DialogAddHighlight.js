import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { useRequest } from 'hooks/use-request'

const DialogAddHighlight = ({ index, open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { request, status } = useRequest()
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
  ]

  const handleSubmit = async values => {
    const { url } = values

    let highlight = { url }
    let siteInfo

    try {
      const { data } = await request({
        url: '/site-info',
        method: 'POST',
        data: { urls: [url] },
      })
      siteInfo = (data || [])[0]
    } catch (err) {
      console.log(err)
    }

    try {
      Object.assign(highlight, siteInfo)

      console.log(highlight)

      const newHighlights = [...highlights]
      newHighlights[index] = highlight

      update({ id: pid, highlights: newHighlights })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: { url: '' },
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
