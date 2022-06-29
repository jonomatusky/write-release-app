import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Box } from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFieldsOrganization'
import { DomainAdd } from '@mui/icons-material'
import AutocompleteIndustry from 'components/AutocompleteIndustry'

const DialogCreateCompany = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { create, createStatus } = useOrganizationsStore()
  const [organizationIndustryId, setOrganizationIndustryId] = useState('')

  const handleSubmit = async values => {
    values.industry = organizationIndustryId
    try {
      const company = await create(values)
      navigate(`/companies/${company.id}`)
    } catch (err) {}
  }

  const formFields = [...getFields('basic'), ...getFields('settings')]

  const { control, submit, reset } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          <DomainAdd />
          <Box pl={1}>Create New Company</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={createStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} mt={1} mb={1}>
        <Grid item xs={12}>
          <Form formFields={formFields} control={control} submit={submit} />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteIndustry
            organizationIndustryId={organizationIndustryId}
            setOrganizationIndustryId={setOrganizationIndustryId}
            // error={error}
          />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogCreateCompany
