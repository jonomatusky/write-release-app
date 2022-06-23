import React from 'react'
import { Box, Chip, Grid, Typography } from '@mui/material'
import { Mic, TimerOutlined, OfflineBolt } from '@mui/icons-material'

import useSession from 'hooks/use-session'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import PanelEdit from 'layouts/PanelEdit'
import DialogEditTags from './DialogEditTags'

const PanelTags = ({ id }) => {
  const { user } = useSession()
  const { select } = useIndividualsStore()
  const individual = select(id)

  const { mediaTrained, quickToBook, frequentSource } = individual || {}
  const individualTags = individual?.tags || []

  const qualities = [
    { name: 'mediaTrained', label: 'Media Trained', Icon: Mic },
    { name: 'quickToBook', label: 'Quick to Book', Icon: TimerOutlined },
    { name: 'frequentSource', label: 'Frequent Source', Icon: OfflineBolt },
  ]

  let qualityList = []

  qualities.forEach(quality => {
    if ((individual || {})[quality.name]) {
      qualityList.push(quality.label)
    }
  })

  const hasTags = individualTags.length > 0
  const hasQualities = mediaTrained || quickToBook || frequentSource

  const showPanel = hasTags || hasQualities

  return (
    <>
      {(!!user || showPanel) && (
        <Grid item xs={12}>
          <PanelEdit dialog={DialogEditTags}>
            <Box p={1} pb={1}>
              {!showPanel && (
                <Box pb={1}>
                  <Typography color="primary" variant="h6">
                    <b>Tags</b>
                  </Typography>
                </Box>
              )}
              {hasQualities && (
                <Box display="flex" flexWrap="wrap" pb={1}>
                  {qualities.map(quality => {
                    const { Icon, name, label } = quality

                    return individual[quality.name] ? (
                      <Box pb={0.5} pr={0.5} key={name}>
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
              )}
              {hasTags && (
                <Box display="flex" flexWrap="wrap">
                  {individualTags.map(tag => (
                    <Box pb={0.5} pr={0.5} key={tag.id}>
                      <Chip label={tag.name} color="primary" size="small" />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </PanelEdit>
        </Grid>
      )}
    </>
  )
}

export default PanelTags
