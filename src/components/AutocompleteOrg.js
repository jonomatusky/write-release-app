import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const AutocompleteOrg = ({ orgId, setId, label, error }) => {
  const { items, select } = useOrganizationsStore()

  const [organizations, setOrganizations] = useState(items)
  const [inputValue, setInputValue] = useState('')

  // const inputTrimmed = inputValue.trim()

  useEffect(() => {
    setOrganizations(items)
  }, [items])

  const selectedOrganization = select(orgId)

  const individualOrganization = selectedOrganization.id
    ? selectedOrganization
    : null

  const handleChange = async (e, v) => {
    let newId = (v || {}).id

    // if (v.includes(addValue)) {
    //   try {
    //     newValue = [...v].filter(value => value !== addValue)
    //     newValue.push(inputTrimmed)

    //     await create({ name: inputValue })
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    setId(newId)
  }

  return (
    <Autocomplete
      clearOnBlur={false}
      options={organizations} // filterSelectedOptions
      value={individualOrganization}
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
            // placeholder="Acme Inc."
            {...params}
            label={label}
            error={Boolean(error)}
            helperText={error}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        )
      }}
    />
  )
}

export default AutocompleteOrg
