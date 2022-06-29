import React from 'react'
import TextFielder from 'components/TextFielder'
import { InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'

const SearchBar = ({ value, setValue }) => {
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
      }}
    />
  )
}

export default SearchBar
