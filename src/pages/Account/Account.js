import React, { useState } from 'react'
import { Container, Box, Grid, Typography, Button } from '@mui/material'
import { useUserStore } from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import TextFielder from 'components/TextFielder'
import HeaderViews from 'components/Header'
import DialogDeleteAcccount from './components/DialogDeleteAccount'

const Account = () => {
  const { fetchStatus } = useUserStore()
  const { user: sessionUser } = useSession()

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)

  return (
    <>
      <DialogDeleteAcccount
        open={deleteDialogIsOpen}
        onClose={() => setDeleteDialogIsOpen(false)}
      />
      <HeaderViews showCreateButton showAvatar />
      <Container maxWidth="xs">
        {fetchStatus === 'succeeded' && (
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} mt={2}>
              <Typography variant="h5" align="center">
                <b>My Account</b>
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography>
                <b>Email</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextFielder disabled value={sessionUser.email} />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Button
                color="error"
                onClick={() => setDeleteDialogIsOpen(true)}
                fullWidth
              >
                Delete Account
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box height="24px" />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default Account
