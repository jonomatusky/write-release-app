import React from 'react'
import { Grid, Box, Typography, Link } from '@mui/material'

import PanelEdit from 'layouts/PanelEdit'
import BasicInfoDialog from './DialogEditBasics'
import useSession from 'hooks/use-session'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import { Email, LocationOn } from '@mui/icons-material'
import usePageTitle from 'hooks/use-page-title'
import Image from 'components/Image'

const PanelBasic = ({ id }) => {
  const { user } = useSession()
  const { select } = useOrganizationsStore()
  const organization = select(id)
  const { logoUrl, name, location, website, email } = organization || {}

  const showPanel = !!logoUrl || !!name || !!location || !!website || !!user

  usePageTitle(name + ' | SourceOn')

  return (
    <>
      {(!!user || showPanel) && (
        <Grid item xs={12}>
          <PanelEdit dialog={BasicInfoDialog}>
            <Box p={2}>
              <Grid container>
                <Grid item xs={12} textAlign="center" pb={1}>
                  <Box width="100%">
                    <Box
                      maxWidth="200px"
                      minHeight="100px"
                      margin="auto"
                      position="relative"
                    >
                      <Image
                        width="100%"
                        height="100%"
                        src={logoUrl}
                        alt={name}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  {name && (
                    <Typography variant="h6">
                      <b>{name}</b>
                    </Typography>
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
                  {email && (
                    <Box
                      display="flex"
                      flexWrap="none"
                      alignItems="center"
                      width="100%"
                    >
                      <Box pr={0.5} display="flex" alignItems="center">
                        <Email color="primary" fontSize="10" />
                      </Box>
                      <Typography
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        variant="subtitle"
                      >
                        <Link
                          href={
                            'mailto:' + email + '?subject=Contacting ' + name
                          }
                          target="_blank"
                        >
                          {email}
                        </Link>
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </PanelEdit>
        </Grid>
      )}
    </>
  )
}
export default PanelBasic
