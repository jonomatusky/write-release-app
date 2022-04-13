import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useTagsStore from 'hooks/store/use-tags-store'

const TagEntry = ({ individualTags, setIndividualTags }) => {
  const { items, create } = useTagsStore()

  const [tags, setTags] = useState(items)
  const [inputValue, setInputValue] = useState('')

  const inputTrimmed = inputValue.trim()

  const addValue = `Add "${inputTrimmed}"`

  useEffect(() => {
    setTags(items)
  }, [items])

  const tagNames = tags.map(tag => tag.name)

  const options = [
    ...tagNames,
    ...(inputValue === '' || tagNames.includes(inputTrimmed) ? [] : [addValue]),
  ]

  const handleChange = async (e, v) => {
    let newValues = v

    if (v.includes(addValue)) {
      try {
        newValues = [...v].filter(value => value !== addValue)
        newValues.push(inputTrimmed)

        await create({ name: inputValue })
      } catch (err) {
        console.log(err)
      }
    }

    setIndividualTags(newValues)
  }

  return (
    <Autocomplete
      multiple
      clearOnBlur={false}
      options={options}
      filterSelectedOptions
      value={individualTags}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        console.log(v)
        setInputValue(v)
      }}
      renderInput={params => {
        return <TextField {...params} label="Tags" />
      }}
    />
  )
}

export default TagEntry
