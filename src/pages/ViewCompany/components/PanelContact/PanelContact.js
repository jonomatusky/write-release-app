import React from 'react'
import { Grid, Button } from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useInquiriesStore from 'hooks/store/use-inquiries-store'

const PanelContact = ({ id }) => {
  const { select } = useOrganizationsStore()
  const organization = select(id)
  const { email, name } = organization || {}

  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: 'organization',
      entityId: id,
    })
  }

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
              onClick={handleContact}
              sx={{ borderRadius: 28, paddingLeft: 3, paddingRight: 3 }}
            >
              Contact {name}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default PanelContact
