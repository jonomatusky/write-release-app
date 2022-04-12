import React from 'react'
import { Grid, Box, Button, Typography, Link } from '@mui/material'
import Panel from 'layouts/Panel'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from '../DialogEditSettings'
import { Mail } from '@mui/icons-material'
import useSession from 'hooks/use-session'

const PanelContact = ({ individual: { email } }) => {
  const { user } = useSession()

  return (
    <>
      {(!!email || !!user) && (
        <Grid item xs={12}>
          <Panel>
            <Box p={2} textAlign="center">
              <Typography pb={1}>
                <b>Get in touch with the PR Team</b>
              </Typography>
              <Button
                color="primary"
                fullWidth
                variant="contained"
                endIcon={<Mail />}
              >
                Contact
              </Button>
              <Box
                display="flex"
                flexWrap="none"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <Typography
                  fontSize={12}
                  pt={1}
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  <Link href={'mailto:' + email} target="_blank">
                    {email}
                  </Link>
                </Typography>
                <Box pt={0.5}>
                  <ButtonEditPanel
                    sx={{ p: 0, ml: 0.5 }}
                    dialog={DialogEditSettings}
                  />
                </Box>
              </Box>
            </Box>
          </Panel>
        </Grid>
      )}
    </>
  )
}

export default PanelContact
