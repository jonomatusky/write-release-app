import React, { useState } from 'react'
import { Button, Typography, Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import DialogAddHighlight from './DialogAddHighlight'

const ButtonAddHighlight = ({ disabled, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogAddHighlight
        open={open}
        onClose={() => setOpen(false)}
        index={index}
      />
      <Button
        disabled={disabled}
        variant="outlined"
        color="primary"
        sx={{
          minHeight: '250px',
          height: '100%',
          width: '100%',
        }}
        size="large"
        disableElevation
        onClick={() => setOpen(true)}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignitems="center"
          justifyContent="center"
          width="100%"
        >
          <Box width="100%" textAlign="center">
            <Add sx={{ fontSize: 48 }} />
          </Box>

          <Typography sx={{ textTransform: 'none' }}>
            <b>Add Highlight</b>
          </Typography>
        </Box>
      </Button>
    </>
  )
}

export default ButtonAddHighlight
