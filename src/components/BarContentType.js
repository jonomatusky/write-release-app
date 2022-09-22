import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useContentTypesStore from 'hooks/store/use-content-types-store'

const BarContentType = ({ typeId, setId, error, label }) => {
  const { items, select } = useContentTypesStore()

  // const options = items.map(item => item.secondary)

  const [inputValue, setInputValue] = useState('')

  const handleChange = async (e, v) => {
    let newId = (v || {}).id
    setId(newId)
  }

  const selected = select(typeId)
  let value =
    !!items && items.length > 0 ? (selected.id ? selected : null) : null

  return (
    <Autocomplete
      clearOnBlur={false}
      options={items}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      getOptionLabel={option => option.secondary || ''}
      openOnFocus
      renderInput={params => {
        return (
          <TextField
            // placeholder="New Hire"
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

export default BarContentType
