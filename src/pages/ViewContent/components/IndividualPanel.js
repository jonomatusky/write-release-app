import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { Mic, TimerOutlined, OfflineBolt } from '@mui/icons-material'

import useIndividualStore from 'hooks/store/use-individuals-store'
import useFetchAvatar from 'hooks/use-fetch-avatar'
import PanelBullets from 'components/PanelBullets/PanelBullets'
import IndividualCard from 'pages/ViewProfiles/components/IndividualCard'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import Panel from 'layouts/Panel'

const IndividualPanel = ({ id, onSubmit }) => {
  const { select, update, updateStatus } = useIndividualStore()
  const individual = select(id)

  useFetchAvatar(id)

  const handleUpdate = async values => {
    try {
      await update({ id, ...values })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async values => {
    try {
      onSubmit(values)
    } catch (err) {
      console.log(err)
    }
  }

  const formFields = [
    {
      name: 'experience',
      label: 'Previous Experience',
      type: 'textarea',
    },
    {
      name: 'education',
      label: 'Education',
      type: 'textarea',
    },
    {
      name: 'notes',
      label: 'Other relevant information',
      type: 'textarea',
      placeholder: 'Home town, hobbies, family, etc.',
    },
  ]

  const { control } = useFormHelper({
    formFields,
    initialValues: individual || [],
    onSubmit: handleSubmit,
  })

  return (
    <Panel>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IndividualCard id={individual.id} hideTags onClick={() => {}} />
          </Grid>
          <Grid item xs={12}>
            <PanelBullets
              title="Fast Facts"
              field="facts"
              bullets={individual.facts || []}
              update={handleUpdate}
              updateStatus={updateStatus}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <Panel>
              <Box p={2} pt={1}>
                <Box pb={1}>
                  <Typography color="primary">
                    <b>Additional Info</b>
                  </Typography>
                </Box> */}
            <Box width="100%">
              <Form formFields={formFields} control={control} />
            </Box>
            {/* </Box>
            </Panel> */}
          </Grid>
        </Grid>
      </Box>
    </Panel>
  )
}

export default IndividualPanel
