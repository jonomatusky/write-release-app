import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Autocomplete, Grid } from '@mui/material'
import useIndividualStore from 'hooks/store/individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useTagsStore from 'hooks/store/tags-store'
import TextFielder from 'components/TextFielder'

const DialogEditTags = ({ open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { fetch, items, create } = useTagsStore()
  const { id } = useParams()
  const individual = select(id)

  const [values, setValues] = useState(individual.tags.map(tag => tag.name))
  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState(items)

  useEffect(() => {
    setTags(items)
  }, [items])

  const tagNames = tags.map(tag => tag.name)

  const addValue = `Add "${inputValue}"`

  const options = [
    ...tagNames,
    ...(inputValue === '' || tagNames.includes(inputValue) ? [] : [addValue]),
  ]

  const handleSubmit = async () => {
    const newTags = values.map(value => tags.find(tag => tag.name === value).id)
    update({ id, tags: newTags })
    onClose()
  }

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

  return (
    <LayoutDialogEdit
      title="Edit Settings"
      open={open}
      onClose={onClose}
      onSave={handleSubmit}
    >
      <Grid container spacing={2} justifyContent="center" pb={2} pt={2}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={options}
            filterSelectedOptions
            renderInput={params => <TextFielder {...params} />}
            value={values}
            onChange={(e, v) => {
              console.log(v)
              if (v.includes(addValue)) {
                const newValues = [...v].filter(value => value !== addValue)
                newValues.push(inputValue)
                handleAddTag()
                setValues(newValues)
              } else {
                setValues(v)
              }

              // if (!tagName.includes(v)) {
              //   create(inputValue)
              // } else {
              //   setValues(v)
              // }
            }}
            inputValue={inputValue}
            onInputChange={(e, v) => {
              setInputValue(v)
            }}
          />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditTags
