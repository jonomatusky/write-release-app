import React from 'react'
import { Grid, Box, Typography, Link } from '@mui/material'

import PanelEdit from 'layouts/PanelEdit'
import { LocationOn, OpenInNew } from '@mui/icons-material'
import ResponsiveLogo from 'components/ResponsiveLogo'
import DialogEditBasicsCompany from './DialogEditBasicsCompany'
import IndustryTag from 'components/IndustryTag'

const PanelBasic = ({ logoUrl, name, location, website, industry }) => {
  return (
    <PanelEdit dialog={DialogEditBasicsCompany}>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} textAlign="center" pb={1}>
            <Box width="100%">
              <Box maxWidth="200px" height="100px" margin="auto">
                <ResponsiveLogo src={logoUrl} alt={name} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box pb={1}>
              {name && (
                <Typography variant="h6">
                  <b>{name}</b>
                </Typography>
              )}
              {website && (
                <Box display="flex" alignItems="center" pl={0.25}>
                  <Typography variant="subtitle2">
                    <Link href={website} target="_blank" underline="none">
                      Visit Website
                    </Link>
                  </Typography>
                  <Link href={website} target="_blank" underline="none">
                    <Box pl={0.5} display="flex" alignItems="center">
                      <OpenInNew fontSize="10" />
                    </Box>
                  </Link>
                </Box>
              )}
            </Box>
            {industry && <IndustryTag id={industry} />}
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
