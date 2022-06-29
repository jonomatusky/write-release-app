import React, { useState } from 'react'
import { Autocomplete } from '@mui/material'
import TextFielder from 'components/TextFielder'
import useTagsStore from 'hooks/store/use-tags-store'

const TagBar = ({ values, setValues, disablePortal }) => {
  const { items: tags } = useTagsStore()

  const options = tags.map(tag => tag.name)

  const [inputValue, setInputValue] = useState('')

  return (
    <Autocomplete
      fullWidth
      disablePortal={disablePortal}
      label="Tags"
      multiple
      options={options}
      filterSelectedOptions
      renderInput={params => <TextFielder label="Tags" {...params} />}
      value={values}
      onChange={setValues}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
      openOnFocus
    />
  )
}

export default TagBar
