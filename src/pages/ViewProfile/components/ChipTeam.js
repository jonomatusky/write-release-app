import React from 'react'
import { Box, Chip, Grid } from '@mui/material'
import { GroupWork, Settings } from '@mui/icons-material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './DialogEditSettings'
import useSession from 'hooks/use-session'

const ChipTeam = ({ team }) => {
  const { user } = useSession()

  return (
    <>
      {!!user && (
        <Grid item xs={12} textAlign="end">
          <Box color="grey.500">
            {team && (
              <Chip
                label={team}
                icon={<GroupWork fontSize="small" />}
                // color="inherit"
              />
            )}
            <ButtonEditPanel
              icon={Settings}
              sx={{ ml: 0.5 }}
              size="medium"
              // fontSize="3px"
              dialog={DialogEditSettings}
            />
          </Box>
        </Grid>
      )}
    </>
  )
}

export default ChipTeam
