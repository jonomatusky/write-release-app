import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, IconButton } from '@mui/material'
import { ArrowBackIos, IosShare } from '@mui/icons-material'
import Logo from 'assets/images/writerelease_mark.png'
import DialogShare from 'components/DialogShare'

const HeaderEdit = ({ text, id }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogShare
        text={text}
        id={id}
        open={open}
        onClose={() => setOpen(false)}
      />
      <Box
        position="absolute"
        zIndex={100}
        top={0}
        left={0}
        right={0}
        display="flex"
      >
        <Box
          pl={1}
          pr={1}
          pt={1}
          display="flex"
          width="100%"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" height={50}>
            <IconButton
              component={RouterLink}
              to="/releases"
              size="large"
              disableRipple
              edge="end"
            >
              <ArrowBackIos />
            </IconButton>
            <Box
              component={RouterLink}
              to={'/releases'}
              display="flex"
              alignItems="center"
              height="32px"
              pb="4px"
              sx={{ textDecoration: 'none' }}
            >
              <img src={Logo} alt="WriteRelease" height="100%" />
            </Box>
          </Box>
          <Box>
            <Box display="flex" alignItems="center" height={50}>
              <Button
                variant="outlined"
                endIcon={<IosShare />}
                onClick={() => setOpen(true)}
              >
                Share
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HeaderEdit
