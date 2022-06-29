import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import AvatarToEdit from './AvatarToEdit'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFieldsIndividual'
import AutocompleteOrg from 'components/AutocompleteOrg'
import Link from 'components/Link'

const BasicInfoDialog = ({ open, onClose }) => {
  const { update, select, updateStatus } = useIndividualStore()
  const { id } = useParams()
  const individual = select(id)
  const { avatarUrl } = individual || {}
  const [individualOrganizationId, setIndividualOrganizationId] = useState(
    individual.organization
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    setIndividualOrganizationId(individual.organization)
  }, [individual.organization])

  useEffect(() => {
    if (!!individualOrganizationId) {
      setError(null)
    } else {
      setError('Please select an organization')
    }
  }, [individualOrganizationId])

  const formFields = getFields('basic')

  const updateImage = imageFilepath => {
    update({ id, avatar: imageFilepath })
  }

  const handleSubmit = async values => {
    if (!individualOrganizationId) {
      setError('Please select an organization')
    } else {
      values.organization = individualOrganizationId
      try {
        await update({ id, ...values })
        onClose()
      } catch (err) {}
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: individual,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    setIndividualOrganizationId(individual.organization)
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
          <AvatarToEdit avatarUrl={avatarUrl} updateImage={updateImage} />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteOrg
            individualOrganizationId={individualOrganizationId}
            setIndividualOrganizationId={setIndividualOrganizationId}
            error={error}
          />
          <Typography variant="caption">
            Don't see the organization listed?{' '}
            <Link to="/companies#create">Create One</Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} submit={submit} />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default BasicInfoDialog
