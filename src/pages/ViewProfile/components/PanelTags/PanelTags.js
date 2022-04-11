import React from 'react'
import { Box, Chip } from '@mui/material'
import PanelEdit from 'layouts/PanelEdit'
import DialogEditTags from './DialogEditTags'

const PanelTags = ({ individual }) => {
  const tags = individual?.tags || []

  const qualities = [
    { name: 'mediaTrained', label: 'Media Trained' },
    { name: 'quickToBook', label: 'Quick to Book' },
    { name: 'quickToBook', label: 'Quick to Book' },
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
        {tags.map(tag => (
          <Box pt={2} pl={1} key={tag.name}>
            <Chip label={tag.name} color="primary" />
          </Box>
        ))}
      </Box>
      <Box display="flex" pr={2} pb={2} pl={1}>
        {qualities.map(quality => {
          return individual[quality.name] ? (
            <Box pt={2} pl={1} key={quality}>
              <Chip label={quality.label} color="secondary" />
            </Box>
          ) : null
        })}
      </Box>
    </PanelEdit>
  )
}

export default PanelTags
