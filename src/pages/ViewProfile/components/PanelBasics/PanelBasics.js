import React from 'react'
import { Grid, Box, Typography, Link, Fab } from '@mui/material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import PanelEdit from 'layouts/PanelEdit'
import BasicInfoDialog from './DialogEditBasics'
import useSession from 'hooks/use-session'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Business, Email, LocationOn } from '@mui/icons-material'
import usePageTitle from 'hooks/use-page-title'

const PanelBasic = ({ id }) => {
  const { user } = useSession()
  const { select } = useIndividualsStore()
  const individual = select(id)
  const { avatarUrl, name, location, title, company, companyUrl, email } =
    individual || {}

  const showPanel =
    !!avatarUrl ||
    !!name ||
    !!location ||
    !!title ||
    !!company ||
    !!companyUrl ||
    !!user

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
                    <Box maxWidth="200px" margin="auto" position="relative">
                      <ResponsiveAvatar avatarUrl={avatarUrl} />
                      {email && (
                        <Box position="absolute" bottom={0} right={0}>
                          <Fab
                            color="primary"
                            href={
                              'mailto:' + email + '?subject=Contacting ' + name
                            }
                            target="_blank"
                          >
                            <Email />
                          </Fab>
                        </Box>
                      )}
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
                  {company && (
                    <Box display="flex" alignItems="center" pt={1}>
                      <Box pr={0.5} display="flex" alignItems="center">
                        <Business color="primary" fontSize="10" />
                      </Box>
                      <Typography variant="subtitle" color="text.secondary">
                        <b>
                          {companyUrl ? (
                            <Link
                              href={companyUrl}
                              target="_blank"
                              underline="none"
                            >
                              {company}
                            </Link>
                          ) : (
                            company
                          )}
                        </b>
                      </Typography>
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
