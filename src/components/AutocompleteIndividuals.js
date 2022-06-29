import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useIndividualsStore from 'hooks/store/use-individuals-store'

const AutocompleteIndividuals = ({ ids, setIds }) => {
  const { items } = useIndividualsStore()

  const [inputValue, setInputValue] = useState('')

  const handleChange = async (e, v) => {
    let newValues = v
    setIds(newValues.map(value => value.id))
  }

  const individuals = items.filter(item => ids.includes(item.id))

  return (
    <Autocomplete
      multiple
      clearOnBlur={false}
      options={items}
      filterSelectedOptions
      value={individuals}
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
            label="Individuals Mentioned"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )
      }}
    />
  )
}

export default AutocompleteIndividuals
