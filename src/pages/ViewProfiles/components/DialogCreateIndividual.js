import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Box, Typography } from '@mui/material'
import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { getFields } from 'util/formFieldsIndividual'
import { PersonAdd } from '@mui/icons-material'
import AutocompleteOrg from 'components/AutocompleteOrg'
import Link from 'components/Link'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const DialogCreateIndividual = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { create, createStatus } = useIndividualStore()

  const [individualOrganizationId, setIndividualOrganizationId] = useState()
  const { select } = useOrganizationsStore()
  const organization = select(individualOrganizationId)
  const [error, setError] = useState(null)
  const [showPage, setShowPage] = useState(0)

  const handleSubmit = async values => {
    values.organization = individualOrganizationId
    try {
      const individual = await create(values)
      navigate(`/profiles/${individual.id}`)
    } catch (err) {}
  }

  const handleSelectCompany = async () => {
    if (!!individualOrganizationId) {
      setShowPage(1)
      setError(null)
    } else {
      setError('Please select an organization')
    }
  }

  useEffect(() => {
    if (!!individualOrganizationId) {
      setError(null)
    }
  }, [individualOrganizationId])

  const formFields = [...getFields('basic')]

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: {
      city: organization.city,
      state: organization.state,
      country: organization.country,
    },
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    setShowPage(0)
    setIndividualOrganizationId(null)
    onClose()
    reset()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          <PersonAdd />
          <Box pl={1}>Create New Profile</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={showPage === 0 ? handleSelectCompany : submit}
      onBack={showPage === 1 ? () => setShowPage(0) : null}
      loading={createStatus === 'loading'}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} mt={1} mb={1}>
        {showPage === 0 && (
          <>
            <Grid item xs={12}>
              <Typography>
                Which company is this individual associated with?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AutocompleteOrg
                individualOrganizationId={individualOrganizationId}
                setIndividualOrganizationId={setIndividualOrganizationId}
                error={error}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Don't see the company in the list?{' '}
                <Link to="/companies#create">Create a new one</Link>{' '}
              </Typography>
            </Grid>
          </>
        )}

        {showPage === 1 && (
          <Grid item xs={12}>
            <Form formFields={formFields} control={control} submit={submit} />
          </Grid>
        )}
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogCreateIndividual
