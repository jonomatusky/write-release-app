import React from 'react'
import { Box, Chip } from '@mui/material'
import { Mic, TimerOutlined, OfflineBolt } from '@mui/icons-material'
import PanelEdit from 'layouts/PanelEdit'
import DialogEditTags from './DialogEditTags'

const PanelTags = ({ individual }) => {
  const individualTags = individual?.tags || []

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
    <PanelEdit dialog={DialogEditTags}>
      <Box display="flex" pr={2} pl={1}>
        {individualTags.map(tag => (
          <Box pt={2} pl={1} key={tag.id}>
            <Chip label={tag.name} color="primary" />
          </Box>
        ))}
      </Box>
      <Box display="flex" pr={2} pb={2} pl={1}>
        {qualities.map(quality => {
          const { Icon, name, label } = quality

          return individual[quality.name] ? (
            <Box pt={2} pl={1} key={name}>
              <Chip
                label={label}
                color="secondary"
                icon={<Icon fontSize="small" />}
              />
            </Box>
          ) : null
        })}
      </Box>
    </PanelEdit>
  )
}

export default PanelTags
