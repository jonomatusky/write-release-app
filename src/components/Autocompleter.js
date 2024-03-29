import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import React, { useState } from 'react'
import TextFielder from './TextFielder'

const Autocompleter = ({
  label,
  error,
  multi,
  options,
  value,
  onChange,
  onAddItem,
  AddDialog,
  addDialogProps,
  disabled,
  helpText,
}) => {
  // const [inputValue, setInputValue] = useState('test')

  let optionsAreObjects

  if (options && options.length > 0) {
    optionsAreObjects = typeof options[0] === 'object'
  }

  let valueForAuto = multi ? [] : null

  if (options && options.length > 0) {
    if (optionsAreObjects) {
      if (!multi) {
        valueForAuto = options?.find(option => option.id === value) || null
      } else {
        valueForAuto = value
          ? value.map(value => options?.find(option => option.id === value))
          : []
      }
    } else {
      valueForAuto = value || null
    }
  }

  const addValue = optionsAreObjects
    ? { id: 'createnew', name: '+ Create New' }
    : '+ Create New'

  const _filterOptions = createFilterOptions()

  const filterOptions = (options, state) => {
    const results = _filterOptions(options, state)

    if (!!onAddItem || !!AddDialog) {
      if (!results.includes(addValue)) {
        results.push(addValue)
      }
    }

    return results
  }

  const [isOpen, setIsOpen] = useState(false)

  const handleAutocompleteChange = (e, v) => {
    if (optionsAreObjects) {
      if (multi) {
        const newValue = v.map(value => value.id)
        if (newValue.includes(addValue.id)) {
          if (!!AddDialog) {
            setIsOpen(true)
          } else if (onAddItem) {
            onAddItem()
          }
        } else {
          onChange(newValue)
        }
      } else {
        let newValue
        if (!!v) {
          newValue = v.id
        } else {
          newValue = null
        }

        if (newValue === addValue.id) {
          if (!!AddDialog) {
            setIsOpen(true)
          } else if (onAddItem) {
            onAddItem()
          }
        } else {
          onChange(newValue)
        }
      }
    } else {
      const newValue = v

      if (multi) {
        if (v.includes(addValue)) {
          if (!!AddDialog) {
            setIsOpen(true)
          } else if (onAddItem) {
            onAddItem()
          }
        } else {
          onChange(newValue)
        }
      } else {
        if (v === addValue) {
          if (!!AddDialog) {
            setIsOpen(true)
          } else if (onAddItem) {
            onAddItem()
          }
        } else {
          onChange(newValue)
        }
      }
    }
  }

  const optionsForAuto = options ? [...options] : []

  // if (!!onAddItem || !!AddDialog) {
  //   optionsForAuto.push(addValue)
  // }

  const handleSubmit = v => {
    if (multi) {
      onChange([...valueForAuto, v])
    } else {
      onChange(v)
    }
  }

  return (
    <>
      {!!AddDialog && (
        <AddDialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          {...addDialogProps}
        />
      )}
      <Autocomplete
        fullWidth
        multiple={multi}
        options={optionsForAuto}
        filterSelectedOptions
        renderInput={params => (
          <TextFielder
            label={label}
            {...params}
            error={error}
            helpText={helpText}
          />
        )}
        getOptionLabel={
          typeof options[0] === 'object'
            ? option => option?.name
            : option => option
        }
        value={valueForAuto}
        onChange={handleAutocompleteChange}
        // inputValue={inputValue}
        // onInputChange={(e, v) => {
        //   console.log(v)
        //   setInputValue(v)
        // }}
        openOnFocus
        disabled={disabled}
        filterOptions={filterOptions}
      />
    </>
  )
}

export default Autocompleter
