import React from 'react'
import { Grid, Box, Typography } from '@mui/material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import PanelEdit from 'layouts/PanelEdit'
import BasicInfoDialog from './DialogEditBasicsIndividual'
import { Business, LocalOffer, LocationOn } from '@mui/icons-material'
import Link from 'components/Link'
import FabContact from 'components/FabContact'

const PanelBasic = ({ id, avatarUrl, name, location, title, organization }) => {
  const { industry, name: orgName, id: orgId } = organization || {}

  return (
    <PanelEdit dialog={BasicInfoDialog}>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} textAlign="center" pb={1}>
            <Box width="100%">
              <Box maxWidth="200px" margin="auto" position="relative">
                <ResponsiveAvatar avatarUrl={avatarUrl} />

                <Box position="absolute" bottom={0} right={0}>
                  <FabContact id={id} type="individual" />
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            {name && (
              <Typography variant="h6">
                <b>{name}</b>
              </Typography>
            )}
            {title && <Typography>{title}</Typography>}
            {organization && (
              <Box display="flex" alignItems="center" pt={1}>
                <Box pr={0.5} display="flex" alignItems="center">
                  <Business color="primary" fontSize="10" />
                </Box>
                <Typography variant="subtitle" color="text.secondary">
                  <b>
                    <Link to={'/companies/' + orgId} underline="none">
                      {orgName}
                    </Link>
                  </b>
                </Typography>
              </Box>
            )}
            {industry && industry.name !== 'Other' && (
              <Box display="flex" alignItems="center">
                <Box pr={0.5} display="flex" alignItems="center">
                  <LocalOffer color="primary" fontSize="10" />
                </Box>
                <Typography variant="subtitle">{industry.name}</Typography>
              </Box>
            )}
            {location && (
              <Box display="flex" alignItems="center">
                <Box pr={0.5} display="flex" alignItems="center">
                  <LocationOn color="primary" fontSize="10" />
                </Box>
                <Typography variant="subtitle" color="text.secondary">
                  <i>{location}</i>
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </PanelEdit>
  )
}
export default PanelBasic
