import React from 'react'
import { Grid, Box, Typography } from '@mui/material'

import useIndividualStore from 'hooks/store/use-individuals-store'
import useFetchAvatar from 'hooks/use-fetch-avatar'
import PanelBullets from 'components/PanelBullets/PanelBullets'
import IndividualCard from './IndividualCard'
import Panel from 'layouts/Panel'
import PanelEdit from 'layouts/PanelEdit'
import DialogIndividualBackground from './DialogIndividualBackground'

const IndividualPanel = ({ id }) => {
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

  const fields = [
    {
      name: 'experience',
      label: 'Previous Experience',
      missing: `You haven't entered any previous experience`,
    },
    {
      name: 'education',
      label: 'Education',
      missing: `You haven't entered any education information`,
    },
    {
      name: 'notes',
      label: 'Other relevant information',
      missing: `You haven't entered any other relevant information about this individual`,
    },
  ]

  return (
    <Panel>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IndividualCard id={individual.id} />
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
            <PanelEdit
              dialog={DialogIndividualBackground}
              dialogProps={{
                id: id,
              }}
            >
              <Box p={2}>
                <Grid container spacing={2}>
                  {fields.map(field => {
                    return (
                      <Grid item xs={12} key={field.name}>
                        <Typography color="primary" pb={1}>
                          <b>{field.label}</b>
                        </Typography>
                        <Typography variant="body2">
                          {individual[field.name] ? (
                            individual[field.name]
                          ) : (
                            <i>{field.missing}</i>
                          )}
                        </Typography>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </PanelEdit>
          </Grid>
        </Grid>
      </Box>
    </Panel>
  )
}

export default IndividualPanel
