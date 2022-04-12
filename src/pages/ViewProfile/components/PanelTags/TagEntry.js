import React, { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material'
import useTagsStore from 'hooks/store/use-tags-store'
import TextFielder from 'components/TextFielder'

const TagEntry = ({ individualTags, setIndividualTags }) => {
  const { items, create } = useTagsStore()

  const [tags, setTags] = useState(items)
  const [inputValue, setInputValue] = useState('')

  const addValue = `Add "${inputValue}"`

  useEffect(() => {
    setTags(items)
  }, [items])

  const tagNames = tags.map(tag => tag.name)
  const individualTagNames = individualTags.map(tag => tag.name)

  const options = [
    ...tagNames,
    ...(inputValue === '' || tagNames.includes(inputValue) ? [] : [addValue]),
  ]

  const handleAddTag = async () => {
    let currentTags = [...tags]
    currentTags.push({ name: inputValue })
    let newTags = currentTags.sort()
    setTags(newTags)

    try {
      await create({ name: inputValue })
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e, v) => {
    console.log(v)
    let newValues = v
    if (v.includes(addValue)) {
      newValues = [...v].filter(value => value !== addValue)
      newValues.push(inputValue)
      handleAddTag()
    }
    setIndividualTags(
      newValues.map(value => tags.find(tag => tag.name === value))
    )
  }

  return (
    <Autocomplete
      multiple
      options={options}
      filterSelectedOptions
      renderInput={params => <TextFielder {...params} />}
      value={individualTagNames}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(e, v) => {
        setInputValue(v)
      }}
    />
  )
}

export default TagEntry
