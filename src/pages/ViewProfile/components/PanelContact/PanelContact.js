import React from 'react'
import { Grid, Button } from '@mui/material'
import { OpenInNew } from '@mui/icons-material'
import useIndividualsStore from 'hooks/store/use-individuals-store'

const PanelContact = ({ id }) => {
  const { select } = useIndividualsStore()
  const individual = select(id)
  const { email, firstName } = individual || {}

  return (
    <>
      {!!email && (
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Grid item>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              endIcon={<OpenInNew />}
              href={'mailto:' + email}
              target="_blank"
              sx={{ borderRadius: 28 }}
            >
              Interview {firstName}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default PanelContact
