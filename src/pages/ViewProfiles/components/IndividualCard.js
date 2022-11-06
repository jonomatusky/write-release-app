import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Box,
  Typography,
  Chip,
  Card,
  CardActionArea,
} from '@mui/material'
import {
  Mic,
  TimerOutlined,
  OfflineBolt,
  LocationOn,
  Business,
} from '@mui/icons-material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import useIndividualStore from 'hooks/store/use-individuals-store'
import useFetchAvatar from 'hooks/use-fetch-avatar'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import IndustryTag from 'components/IndustryTag'

const IndividualCard = ({ id, onClick, hideTags }) => {
  const { select } = useIndividualStore()
  const { select: selectOrganization } = useOrganizationsStore()
  const individual = select(id)
  const { name, location, organization, title, avatarUrl } = individual || {}

  const company = selectOrganization(organization) || {}
  const { industry } = company

  useFetchAvatar(id)

  const tags = individual?.tags || []

  const qualities = [
    { name: 'mediaTrained', label: 'Media Trained', Icon: Mic },
    { name: 'quickToBook', label: 'Quick to Book', Icon: TimerOutlined },
    { name: 'frequentSource', label: 'Frequent Source', Icon: OfflineBolt },
  ]

  let qualityList = []

  qualities.forEach(quality => {
    if (individual[quality.name]) {
      qualityList.push(quality.label)
    }
  })

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardActionArea
        onClick={!!onClick ? onClick : null}
        component={!!onClick ? null : RouterLink}
        to={!!onClick ? null : '/profiles/' + id}
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
                {industry && <IndustryTag id={industry} />}
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
                {!hideTags && (
                  <>
                    <Box
                      display="flex"
                      width="100%"
                      overflow="auto"
                      sx={{
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {tags.map(tag => (
                        <Box pt={0.5} pr={0.5} key={tag.name} maxHeight="112px">
                          <Chip label={tag.name} color="primary" size="small" />
                        </Box>
                      ))}
                    </Box>
                    <Box
                      display="flex"
                      width="100%"
                      overflow="auto"
                      sx={{
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {qualities.map(quality => {
                        const { name, label } = quality
                        return individual[quality.name] ? (
                          <Box pt={0.5} pr={0.5} key={name}>
                            <Chip
                              label={label}
                              color="secondary"
                              size="small"
                            />
                          </Box>
                        ) : null
                      })}
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default IndividualCard
