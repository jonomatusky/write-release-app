import React from 'react'
import { Grid, Box, Typography } from '@mui/material'

import useFetchAvatar from 'hooks/use-fetch-avatar'
import PanelBullets from 'components/PanelBullets/PanelBullets'
import OrganizationCard from './OrganizationCard'
import Panel from 'layouts/Panel'
import PanelEdit from 'layouts/PanelEdit'
import DialogOrganizationBackground from './DialogOrganizationBackground'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const OrganizationPanel = ({ id }) => {
  const { select, update, updateStatus } = useOrganizationsStore()
  const organization = select(id)

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
      name: 'boilerplate',
      label: 'Company Boilerplate',
      missing: `You haven't entered any company boilerplate`,
    },
    {
      name: 'descriptor',
      label: 'Company Descriptor',
      missing: `You haven't entered a company descriptor`,
    },
  ]

  return (
    <Panel>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OrganizationCard id={id} />
          </Grid>
          <Grid item xs={12}>
            <PanelBullets
              title="Fast Facts"
              field="facts"
              bullets={organization.facts || []}
              update={handleUpdate}
              updateStatus={updateStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <PanelEdit
              dialog={DialogOrganizationBackground}
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
                          {organization[field.name] ? (
                            organization[field.name]
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

export default OrganizationPanel
