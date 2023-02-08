import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import { Business, Description, Newspaper } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import DialogAbout from './DialogAbout'

const PanelAbout = ({ id }) => {
  const { select } = useContentStore()
  const { select: selectContentType } = useContentTypesStore()
  const content = select(id)
  const type = selectContentType(content.type)

  const { select: selectOrganization } = useOrganizationsStore()

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogAbout} dialogProps={{ id }}>
        <Box p={1.5} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>About</b>
              </Typography>
            </Grid>
            <Grid item>
              <Chip label={type.primary} size="small" icon={<Description />} />
            </Grid>
            <Grid item>
              <Chip label={type.secondary} size="small" icon={<Newspaper />} />
            </Grid>
            {content.organizations.map(organizationId => {
              const organization = selectOrganization(organizationId)
              return (
                <Grid item key={organizationId}>
                  <Chip
                    label={organization.name}
                    size="small"
                    icon={<Business />}
                    component={RouterLink}
                    to={`/companies/${organizationId}`}
                    clickable
                  />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelAbout
