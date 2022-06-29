import React, { useState } from 'react'
import { Grid } from '@mui/material'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import TagEntry from 'components/TagEntry'
import useTagsStore from 'hooks/store/use-tags-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from './Form/Form'

const DialogEditTags = ({
  tags,
  qualities,
  open,
  onClose,
  update,
  updateStatus,
}) => {
  const { items: tagList } = useTagsStore()

  const startingTags = (tags || []).map(tag => tag.name)

  const [entityTags, setEntityTags] = useState(startingTags)

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
    const tagIds = entityTags.map(
      tagName => tagList.find(tag => tag.name === tagName).id
    )

    try {
      await update({ ...values, tags: tagIds })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: qualities,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    setEntityTags(startingTags)
    reset()
  }

  return (
    <LayoutDialogEdit
      title="Edit Tags"
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pt={2}>
        <Grid item xs={12}>
          <TagEntry tags={entityTags} setTags={setEntityTags} />
        </Grid>
        {qualities && (
          <Grid item xs={12}>
            <Form
              formFields={formFields}
              control={control}
              submit={submit}
              spacing={0}
            />
          </Grid>
        )}
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditTags
