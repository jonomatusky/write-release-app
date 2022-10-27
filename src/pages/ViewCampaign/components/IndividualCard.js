import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { LocalOffer, LocationOn, Business } from '@mui/icons-material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import useIndividualStore from 'hooks/store/use-individuals-store'
import useFetchAvatar from 'hooks/use-fetch-avatar'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import PanelEdit from 'layouts/PanelEdit'
import DialogCreateEditIndividual from './DialogCreateEditIndividual'

const IndividualCard = ({ id }) => {
  const { select } = useIndividualStore()
  const { select: selectOrganization } = useOrganizationsStore()
  const individual = select(id)
  const { name, location, organization, title, avatarUrl } = individual || {}

  const company = selectOrganization(organization) || {}
  const { industry } = company

  useFetchAvatar(id)

  return (
    <PanelEdit
      dialog={DialogCreateEditIndividual}
      dialogProps={{
        individual,
        organizationId: organization.id,
      }}
    >
      <Box p={2} overflow="hidden" width="100%">
        <Grid container sx={{ width: '100%', overflow: 'hidden' }}>
          <Grid item xs={6} sm={3} textAlign="center">
            <Box p={1} pr={3} height="100%" alignItems="center">
              <ResponsiveAvatar avatarUrl={avatarUrl} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={9}>
            <Box pl={1} overflow="hidden">
              <Typography variant="h6">
                <b>{name}</b>
              </Typography>
              {organization && (
                <Box display="flex" alignItems="center">
                  <Box pr={0.5} display="flex" alignItems="center">
                    <Business color="primary" fontSize="10" />
                  </Box>
                  <Typography color="primary">
                    <b>{company.name}</b>
                  </Typography>
                </Box>
              )}
              {title && <Typography>{title}</Typography>}
              {industry && industry.name !== 'Other' && (
                <Box display="flex" alignItems="center">
                  <Box pr={0.5} display="flex" alignItems="center">
                    <LocalOffer color="primary" fontSize="12" />
                  </Box>
                  <Typography>{industry.name}</Typography>
                </Box>
              )}
              {location && (
                <Box display="flex" alignItems="center">
                  <Box pr={0.5} display="flex" alignItems="center">
                    <LocationOn color="primary" fontSize="12" />
                  </Box>
                  <Typography color="text.secondary">
                    <i>{location}</i>
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PanelEdit>
  )
}

export default IndividualCard
