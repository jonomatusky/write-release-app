import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import { Business } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import DialogAbout from './DialogAbout'

const PanelAbout = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectOrganization } = useOrganizationsStore()

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogAbout} dialogProps={{ id }}>
        <Box p={1.5} pt={1} overflow="hidden">
          <Grid container spacing={0.5} overflow="hidden">
            <Grid item xs={12}>
              <Typography pb={0.5} variant="body2">
                {content.title || content.titleInternal}
              </Typography>
            </Grid>
            {!!content.organization && (
              <Grid item key={content.organization}>
                <Chip
                  label={selectOrganization(content.organization).name}
                  size="small"
                  icon={<Business />}
                  component={RouterLink}
                  to={`/companies/${content.organization}`}
                  clickable
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelAbout
