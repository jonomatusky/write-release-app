import React from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Clear, Search } from '@mui/icons-material'
import TextFielder from './TextFielder'

const SearchBar = ({ value, setValue, ...props }) => {
  const handleClick = () => {
    setValue('')
  }

  return (
    <TextFielder
      // label="Search"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: !!value ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClick}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      {...props}
    />
  )
}

export default SearchBar
