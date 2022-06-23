import React from 'react'
import { Box, Chip } from '@mui/material'
import { Settings } from '@mui/icons-material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './DialogEditSettings'
import useSession from 'hooks/use-session'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const ChipTeam = ({ id, ...props }) => {
  const { user } = useSession()
  const { select } = useOrganizationsStore()
  const organization = select(id)
  const { team } = organization || {}

  return (
    <>
      {!!user && (
        <Box color="grey.500" {...props}>
          {team && (
            <Chip
              label={team}
              // icon={<GroupWork fontSize="small" />}
              // color="inherit"
            />
          )}
          <ButtonEditPanel
            icon={Settings}
            sx={{ ml: 0.25 }}
            padding={0}
            size="medium"
            // fontSize="3px"
            dialog={DialogEditSettings}
          />
        </Box>
      )}
    </>
  )
}

export default ChipTeam
