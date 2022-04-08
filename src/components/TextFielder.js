import React from 'react'
import { TextField } from '@mui/material'

const TextFielder = props => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="off"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  )
}

export default TextFielder
