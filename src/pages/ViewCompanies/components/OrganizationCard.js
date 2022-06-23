import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Box,
  Typography,
  Link,
  Chip,
  Card,
  CardActionArea,
} from '@mui/material'
import { Mic, TimerOutlined, OfflineBolt } from '@mui/icons-material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useFetchLogo from 'hooks/use-fetch-logo'

const OrganizationCard = ({ id }) => {
  const { select } = useOrganizationsStore()
  const organization = select(id)
  const { name, location, title, company, companyUrl, logoUrl } =
    organization || {}

  useFetchLogo(id)

  const tags = organization?.tags || []

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

  const navigate = useNavigate()

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate('/companies/' + organization.id)}>
        <Box p={1} height="320px">
          <Grid container>
            <Grid item xs={6} textAlign="center">
              <Box width="100%">
                <Box maxWidth="150px" margin="auto" p={1}>
                  <ResponsiveAvatar avatarUrl={logoUrl} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <b>{name}</b>
              </Typography>
              <Typography variant="subtitle" color="text.secondary">
                <i>{location}</i>
              </Typography>
              <Typography>{title}</Typography>
              {
                <Typography>
                  {companyUrl ? (
                    <Link href={companyUrl} target="_blank">
                      {company}
                    </Link>
                  ) : (
                    company
                  )}
                </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" width="100%" flexWrap="wrap">
                {tags.map(tag => (
                  <Box pt={0.5} pl={0.5} key={tag.name} maxHeight="112px">
                    <Chip label={tag.name} color="primary" size="small" />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" width="100%" flexWrap="wrap">
                {qualities.map(quality => {
                  const { name, label } = quality

                  return organization[quality.name] ? (
                    <Box pt={0.5} pl={0.5} key={name}>
                      <Chip label={label} color="secondary" size="small" />
                    </Box>
                  ) : null
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default OrganizationCard
