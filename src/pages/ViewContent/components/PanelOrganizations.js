import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import { Business } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogOrganizations from './DialogOrganizations'

const PanelOrganizations = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectOrganization } = useOrganizationsStore()

  const organizations = content.organizations

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogOrganizations} dialogProps={{ id }}>
        <Box p={2} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Organizations</b>
              </Typography>
            </Grid>
            {organizations &&
              organizations.length > 0 &&
              organizations.map(organizationId => {
                const organization = selectOrganization(organizationId)
                return (
                  <Grid item xs={12} key={organizationId}>
                    <Chip
                      label={organization.name}
                      size="small"
                      icon={<Business />}
                      component={RouterLink}
                      to={`/companies/${content.organization}`}
                      clickable
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelOrganizations
