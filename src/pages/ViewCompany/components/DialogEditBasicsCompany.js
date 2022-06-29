import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import LogoToEdit from './LogoToEdit'
import useOrganizationStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFieldsOrganization'
import AutocompleteIndustry from 'components/AutocompleteIndustry'

const DialogEditBasicsCompany = ({ open, onClose }) => {
  const { update, select, updateStatus } = useOrganizationStore()
  const { id } = useParams()
  const organization = select(id)
  const { logoUrl } = organization || {}
  const [organizationIndustryId, setOrganizationIndustryId] = useState(
    (organization.industry || {}).id
  )

  useEffect(() => {
    setOrganizationIndustryId((organization.industry || {}).id)
  }, [organization.industry])

  const formFields = getFields('basic')

  const updateImage = imageFilepath => {
    update({ id, logo: imageFilepath })
  }

  const handleSubmit = async values => {
    values.industry = organizationIndustryId
    try {
      await update({ id, ...values })
      onClose()
    } catch (err) {}
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: organization,
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
          <LogoToEdit src={logoUrl} updateImage={updateImage} />
        </Grid>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} submit={submit} />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteIndustry
            organizationIndustryId={organizationIndustryId}
            setOrganizationIndustryId={setOrganizationIndustryId}
          />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditBasicsCompany
