import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import {
  Mic,
  TimerOutlined,
  OfflineBolt,
  LocationOn,
} from '@mui/icons-material'

import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useFetchLogo from 'hooks/use-fetch-logo'
import ResponsiveLogo from 'components/ResponsiveLogo'
import PanelEdit from 'layouts/PanelEdit'
import DialogCreateEditCompany from './DialogCreateEditCompany'
import IndustryTag from 'components/IndustryTag'

const OrganizationCard = ({ id }) => {
  const { select } = useOrganizationsStore()
  const organization = select(id)
  const { name, location, logoUrl, industry } = organization || {}

  useFetchLogo(id)

  const qualities = [
    { name: 'mediaTrained', label: 'Media Trained', Icon: Mic },
    { name: 'quickToBook', label: 'Quick to Book', Icon: TimerOutlined },
    { name: 'frequentSource', label: 'Frequent Source', Icon: OfflineBolt },
  ]

  let qualityList = []

  qualities.forEach(quality => {
    if (organization[quality.name]) {
      qualityList.push(quality.label)
    }
  })

  return (
    <PanelEdit dialog={DialogCreateEditCompany} dialogProps={{ organization }}>
      <Box p={2}>
        <Grid container>
          <Grid item xs={6} sm={4} textAlign="center">
            <Box p={1} pr={3} height="100px" alignItems="center" width="100%">
              <ResponsiveLogo src={logoUrl} alt={name} />
            </Box>
          </Grid>
          <Grid item xs={6} sm={8}>
            <Box pl={1}>
              <Typography variant="h6">
                <b>{name}</b>
              </Typography>
              <IndustryTag id={industry} />
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

export default OrganizationCard
