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

const IndividualCard = ({ individual }) => {
  const { avatar, name, location, title, company, companyUrl } =
    individual || {}

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

  const navigate = useNavigate()

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => navigate('/profiles/' + individual.id)}>
        <Box p={1} height="300px">
          <Grid container>
            <Grid item xs={6} textAlign="center">
              <Box width="100%">
                <Box maxWidth="150px" margin="auto" p={1}>
                  <ResponsiveAvatar image={avatar} />
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
                  <Box pt={0.5} pl={0.5} key={tag.name}>
                    <Chip label={tag.name} color="primary" size="small" />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" width="100%" flexWrap="wrap">
                {qualities.map(quality => {
                  const { Icon, name, label } = quality

                  return individual[quality.name] ? (
                    <Box pt={0.5} pl={0.5} key={name}>
                      <Chip
                        label={label}
                        color="secondary"
                        size="small"
                        icon={<Icon fontSize="small" />}
                      />
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

export default IndividualCard
