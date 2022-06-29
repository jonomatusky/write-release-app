import React, { useState } from 'react'
import { Autocomplete } from '@mui/material'
import TextFielder from 'components/TextFielder'
import useIndustriesStore from 'hooks/store/use-industries-store'

const IndustriesBar = ({ values, setValues, disablePortal }) => {
  const { items } = useIndustriesStore()

  const options = items.map(item => item.name)

  const [inputValue, setInputValue] = useState('')

  return (
    <Autocomplete
      fullWidth
      disablePortal={disablePortal}
      label="Tags"
      multiple
      options={options}
      filterSelectedOptions
      renderInput={params => <TextFielder label="Industries" {...params} />}
      value={values}
      onChange={setValues}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
    />
  )
}

export default IndustriesBar
