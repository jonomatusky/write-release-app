import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const AutocompleteOrgs = ({ ids, setIds }) => {
  const { items } = useOrganizationsStore()

  const [inputValue, setInputValue] = useState('')

  const handleChange = async (e, v) => {
    let newValues = v
    setIds(newValues.map(value => value.id))
  }

  const orgs = items.filter(item => ids.includes(item.id))

  return (
    <Autocomplete
      multiple
      clearOnBlur={false}
      options={items}
      filterSelectedOptions
      value={orgs}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      getOptionLabel={option => option.name || ''}
      renderInput={params => {
        return (
          <TextField
            {...params}
            label="Companies Mentioned"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )
      }}
    />
  )
}

export default AutocompleteOrgs
