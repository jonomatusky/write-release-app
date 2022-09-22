import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useIndustriesStore from 'hooks/store/use-industries-store'

const AutocompleteIndustry = ({
  organizationIndustryId,
  setOrganizationIndustryId,
  error,
}) => {
  const { items, select } = useIndustriesStore()

  const [inputValue, setInputValue] = useState('')

  // const inputTrimmed = inputValue.trim()

  const selectedIndustry = select(organizationIndustryId)

  const individualIndustry = selectedIndustry.id ? selectedIndustry : null

  const handleChange = async (e, v) => {
    let newIndustryId = (v || {}).id

    // if (v.includes(addValue)) {
    //   try {
    //     newValue = [...v].filter(value => value !== addValue)
    //     newValue.push(inputTrimmed)

    //     await create({ name: inputValue })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    setOrganizationIndustryId(newIndustryId)
  }

  return (
    <Autocomplete
      clearOnBlur={false}
      options={items}
      // filterSelectedOptions
      value={individualIndustry}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      getOptionLabel={option => option.name || ''}
      openOnFocus
      renderInput={params => {
        return (
          <TextField
            placeholder="Financial Services"
            {...params}
            label="Industry"
            error={Boolean(error)}
            helperText={error}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )
      }}
    />
  )
}

export default AutocompleteIndustry
