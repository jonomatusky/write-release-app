import React from 'react'
import { Box, Chip, Typography } from '@mui/material'
import { Mic, TimerOutlined, OfflineBolt } from '@mui/icons-material'

import PanelEdit from 'layouts/PanelEdit'
import DialogEditTags from './DialogEditTags'

const PanelTags = ({ tags, qualities, update, updateStatus }) => {
  const qualitiesList = [
    { name: 'mediaTrained', label: 'Media Trained', Icon: Mic },
    { name: 'quickToBook', label: 'Quick to Book', Icon: TimerOutlined },
    { name: 'frequentSource', label: 'Frequent Source', Icon: OfflineBolt },
  ]

  let qualitiesToShow
  qualitiesToShow = qualities
    ? qualitiesList.filter(quality => !!qualities[quality.name])
    : []

  return (
    <PanelEdit
      dialog={DialogEditTags}
      dialogProps={{ update, updateStatus, tags, qualities }}
    >
      <Box p={1} pb={1}>
        {(!tags || tags.length === 0) &&
          (!qualitiesToShow || qualitiesToShow.length === 0) && (
            <Box pb={1}>
              <Typography color="primary" variant="h6">
                <b>Tags</b>
              </Typography>
            </Box>
          )}
        {tags && tags.length > 0 && (
          <Box display="flex" flexWrap="wrap">
            {tags.map(tag => (
              <Box pb={0.5} pr={0.5} key={tag.id}>
                <Chip label={tag.name} color="primary" size="small" />
              </Box>
            ))}
          </Box>
        )}
        {qualitiesToShow && (
          <Box display="flex" flexWrap="wrap" pb={1}>
            {qualitiesToShow.map(quality => {
              const { Icon, name, label } = quality

              return (
                <Box pb={0.5} pr={0.5} key={name}>
                  <Chip
                    label={label}
                    color="secondary"
                    size="small"
                    icon={<Icon fontSize="small" />}
                  />
                </Box>
              )
            })}
          </Box>
        )}
      </Box>
    </PanelEdit>
  )
}

export default PanelTags
