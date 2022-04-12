import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import TagEntry from './TagEntry'

const DialogEditTags = ({ open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { pid } = useParams()
  const individual = select(pid)

  const [individualTags, setIndividualTags] = useState(individual.tags)

  const formFields = [
    {
      name: 'mediaTrained',
      label: 'Media Trained',
      type: 'boolean',
    },
    {
      name: 'quickToBook',
      label: 'Quick to Book',
      type: 'boolean',
    },
    {
      name: 'frequentSource',
      label: 'Frequent Source',
      type: 'boolean',
    },
  ]

  const handleSubmit = async values => {
    console.log('submitting')
    console.log(values)

    const tagIds = individualTags.map(tag => tag._id)

    console.log(individualTags)
    console.log(tagIds)

    try {
      await update({ id: pid, ...values, tags: tagIds })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  console.log(individual)

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
      title="Edit Tags"
      open={open}
      onClose={handleClose}
      onSave={submit}
    >
      <Grid container spacing={2} justifyContent="center" pt={2}>
        <Grid item xs={12}>
          <TagEntry
            individualTags={individualTags}
            setIndividualTags={setIndividualTags}
          />
        </Grid>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} spacing={0} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditTags
