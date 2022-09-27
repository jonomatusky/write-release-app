import React, { useState } from 'react'
import { Autocomplete } from '@mui/material'
import TextFielder from 'components/TextFielder'
import useIndividualsStore from 'hooks/store/use-individuals-store'

const BarIndividuals = ({
  options,
  label,
  values,
  setValues,
  disablePortal,
}) => {
  const { items } = useIndividualsStore()

  const [inputValue, setInputValue] = useState('')

  const valueObjects =
    items && items.length > 0 && values
      ? values.map(value => items.find(item => item.id === value))
      : []

  const handleChange = (e, v) => {
    let newValues = v.map(value => value.id)
    setValues(newValues)
  }

  return (
    <Autocomplete
      fullWidth
      disablePortal={disablePortal}
      multiple
      options={options || []}
      filterSelectedOptions
      renderInput={params => <TextFielder label={label} {...params} />}
      getOptionLabel={option => option?.name}
      value={valueObjects}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      openOnFocus
    />
  )
}

export default BarIndividuals
