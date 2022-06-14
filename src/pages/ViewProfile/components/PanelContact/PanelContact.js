import React from 'react'
import { Grid, Button } from '@mui/material'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import useInquiriesStore from 'hooks/store/use-inquiries-store'

const PanelContact = ({ id }) => {
  const { select } = useIndividualsStore()
  const individual = select(id)
  const { email, firstName } = individual || {}

  const { setEntity } = useInquiriesStore()
  const handleContact = () => {
    setEntity({
      entityType: 'individual',
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
              Interview {firstName}
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default PanelContact
