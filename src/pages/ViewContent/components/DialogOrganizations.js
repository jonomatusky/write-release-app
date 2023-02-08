import React from 'react'
import { Box, Grid } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const DialogOrganizations = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const { items: organizations } = useOrganizationsStore()
  const content = select(id)

  const organizationId = ((content || {}).organizations || [])[0]

  const organizationsOrg = organizations.filter(
    organization => organization.organization === organizationId
  )

  const organizationsNotOrg = organizations.filter(
    organization => organization.organization !== organizationId
  )

  const organizationsOptions = [...organizationsOrg, ...organizationsNotOrg]

  const formFields = [
    {
      label: `Add any indivduals to pull in their key info`,
      name: 'organizations',
      options: organizationsOptions || [],
      type: 'auto-multi',
    },
    {
      label: `List any organizations below that aren't in our database`,
      helpText: 'Include their name, title and company',
      name: 'otherOrganizations',
      options: organizationsOptions || [],
      type: 'textarea',
    },
  ]

  const handleSubmit = async values => {
    const newContent = {
      id,
      ...values,
    }

    try {
      await update(newContent)
      await onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: content,
    onSubmit: handleSubmit,
  })

  const handleClose = async () => {
    reset()
    onClose()
  }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          {/* <Edit /> */}
          <Box pl={1}>Quotes</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={submit}
      loading={updateStatus === 'loading'}
      label="Save"
      cancelLabel="Cancel"
    >
      <Box display="flex">
        <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
          <Grid item xs={12}>
            <Form submit={submit} control={control} formFields={formFields} />
          </Grid>
        </Grid>
      </Box>
    </LayoutDialogEdit>
  )
}

export default DialogOrganizations
