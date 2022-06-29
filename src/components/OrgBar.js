import React, { useState } from 'react'
import { Autocomplete } from '@mui/material'
import TextFielder from 'components/TextFielder'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const OrgBar = ({ value, setValue, disablePortal }) => {
  const { items } = useOrganizationsStore()
  const obValue = items.find(item => item.id === value) || null

  const [inputValue, setInputValue] = useState('')

  const handleChange = async (e, v) => {
    let id = (v || {}).id
    setValue(id)
  }

  return (
    <Autocomplete
      disablePortal={disablePortal}
      fullWidth
      label="Company"
      options={items}
      filterSelectedOptions
      renderInput={params => <TextFielder label="Company" {...params} />}
      value={obValue}
      // PopperComponent={({ style, ...props }) => (
      //   <Popper
      //     {...props}
      //     sx={{ ...style, zIndex: theme => theme.zIndex.appBar - 1 }}
      //   />
      // )}
      onChange={handleChange}
      inputValue={inputValue}
      getOptionLabel={option => option.name || ''}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      openOnFocus
    />
  )
}

export default OrgBar
