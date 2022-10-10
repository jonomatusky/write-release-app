import { Autocomplete } from '@mui/material'
import React, { useState } from 'react'
import TextFielder from './TextFielder'

const Autocompleter = ({ label, error, multi, options, value, onChange }) => {
  const [inputValue, setInputValue] = useState('')

  let optionsAreObjects

  if (options && options.length > 0) {
    optionsAreObjects = typeof options[0] === 'object'
  }

  let valueForAuto = multi ? [] : null

  if (options && options.length > 0) {
    if (optionsAreObjects) {
      if (!multi) {
        valueForAuto = options?.find(option => option.id === value) || null
      } else {
        valueForAuto = value
          ? value.map(value => options?.find(option => option.id === value))
          : []
      }
    } else {
      valueForAuto = value || null
    }
  }

  const handleAutocompleteChange = (e, v) => {
    let newValue = optionsAreObjects
      ? multi
        ? v.map(value => value.id)
        : v?.id
      : v
    onChange(newValue)
  }

  return (
    <Autocomplete
      fullWidth
      multiple={multi}
      options={options || []}
      filterSelectedOptions
      renderInput={params => (
        <TextFielder label={label} {...params} error={error} />
      )}
      getOptionLabel={
        typeof options[0] === 'object'
          ? option => option?.name
          : option => option
      }
      value={valueForAuto}
      onChange={handleAutocompleteChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      openOnFocus
    />
  )
}

export default Autocompleter
