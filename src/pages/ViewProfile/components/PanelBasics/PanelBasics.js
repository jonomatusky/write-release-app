import React from 'react'
import { Grid, Box, Typography, Link } from '@mui/material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import PanelEdit from 'layouts/PanelEdit'
import BasicInfoDialog from './DialogEditBasics'

const PanelBasic = ({ individual }) => {
  const { avatar, name, location, title, company, companyUrl } =
    individual || {}

  return (
    <PanelEdit dialog={BasicInfoDialog}>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} textAlign="center">
            <Box width="100%">
              <Box maxWidth="250px" margin="auto">
                <ResponsiveAvatar image={avatar} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} pt={1}>
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
                  { company }
                )}
              </Typography>
            }
          </Grid>
        </Grid>
      </Box>
    </PanelEdit>
  )
}
export default PanelBasic
