import React from 'react'
import { Grid, Box, Typography, Link } from '@mui/material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import PanelEdit from 'layouts/PanelEdit'
import BasicInfoDialog from './DialogEditBasics'
import useSession from 'hooks/use-session'

const PanelBasic = ({ individual }) => {
  const { user } = useSession()
  const { avatar, name, location, title, company, companyUrl } =
    individual || {}

  const showPanel =
    !!avatar ||
    !!name ||
    !!location ||
    !!title ||
    !!company ||
    !!companyUrl ||
    !!user

  return (
    <>
      {showPanel && (
        <Grid item xs={12}>
          <PanelEdit dialog={BasicInfoDialog}>
            <Box p={2}>
              <Grid container>
                {avatar && (
                  <Grid item xs={12} textAlign="center" pb={1}>
                    <Box width="100%">
                      <Box maxWidth="250px" margin="auto">
                        <ResponsiveAvatar image={avatar} />
                      </Box>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12}>
                  {name && (
                    <Typography variant="h6">
                      <b>{name}</b>
                    </Typography>
                  )}
                  {title && <Typography>{title}</Typography>}
                  {company && (
                    <Typography>
                      <b>
                        {companyUrl ? (
                          <Link href={companyUrl} target="_blank">
                            {company}
                          </Link>
                        ) : (
                          company
                        )}
                      </b>
                    </Typography>
                  )}
                  {location && (
                    <Typography variant="subtitle" color="text.secondary">
                      <i>{location}</i>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </PanelEdit>
        </Grid>
      )}
    </>
  )
}
export default PanelBasic
