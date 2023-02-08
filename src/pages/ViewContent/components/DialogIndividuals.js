import React from 'react'
import { Box, Grid } from '@mui/material'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import DialogCreateIndividual from './DialogCreateEditIndividual'

const DialogIndividuals = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const { items: individuals } = useIndividualsStore()
  const content = select(id)

  const organizationId = ((content || {}).organizations || [])[0]

  const individualsOrg = individuals.filter(
    individual => individual.organization === organizationId
  )

  const individualsNotOrg = individuals.filter(
    individual => individual.organization !== organizationId
  )

  const individualsOptions = [...individualsOrg, ...individualsNotOrg]

  const formFields = [
    {
      label: `Add any indivduals to pull in their key info`,
      name: 'individuals',
      options: individualsOptions || [],
      type: 'auto-multi',
      AddDialog: DialogCreateIndividual,
    },
    {
      label: `List any individuals below that aren't in our database`,
      helpText: 'Include their name, title and company',
      name: 'otherIndividuals',
      options: individualsOptions || [],
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

export default DialogIndividuals
