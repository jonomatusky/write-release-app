import React from 'react'
import { TextField } from '@mui/material'

const TextFielder = ({ error, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      autoComplete="off"
      // InputLabelProps={{
      //   shrink: true,
      // }}
      error={Boolean(error)}
      helperText={error?.message}
      {...props}
    />
  )
}

export default TextFielder
