import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import {
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
} from '@mui/material'
import TextFielder from 'components/TextFielder'

const FormField = ({ formField, control, options, onAddItem }) => {
  const { name, label, type, helpText, placeholder } = formField
  // const [inputValue, setInputValue] = useState(type === 'auto-multi' ? [] : '')
  const [inputValue, setInputValue] = useState('')

  let optionsAreObjects

  if (options && options.length > 0) {
    optionsAreObjects = typeof options[0] === 'object'
  }

  const renderField = ({ field, fieldState }) => {
    const { onChange, onBlur, value } = field

    let valueForAuto = type === 'auto-multi' ? [] : null

    if (
      (type === 'auto' || type === 'auto-multi') &&
      options &&
      options.length > 0
    ) {
      if (optionsAreObjects) {
        if (type === 'auto') {
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

    const handleAutocompleteChange = (e, v) => {
      let newValue = optionsAreObjects
        ? type === 'auto-multi'
          ? v.map(value => value.id)
          : v?.id
        : v
      onChange(newValue)
    }

    const { error } = fieldState

    const handleCheckboxChange = event => {
      onChange(event.target.checked)
    }

    switch (type) {
      case 'boolean':
        return (
          <Box pl={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={value} onChange={handleCheckboxChange} />
                }
                label={label}
              />
            </FormGroup>
            {!!helpText && (
              <Typography fontSize="14px" color="secondary">
                <i>{helpText}</i>
              </Typography>
            )}
          </Box>
        )
      case 'date':
        return (
          <>
            <TextFielder
              label={label}
              value={value.toString().slice(0, 10)}
              onChange={onChange}
              onBlur={onBlur}
              error={error}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {!!helpText && (
              <Typography fontSize="14px" color="secondary" pt={1}>
                <i>{helpText}</i>
              </Typography>
            )}
          </>
        )
      case 'tel':
        return (
          <>
            <TextFielder
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              label={label}
              value={value.toString().slice(0, 10)}
              onChange={onChange}
              onBlur={onBlur}
              error={error}
              type="tel"
            />
            {!!helpText && (
              <Typography fontSize="14px" color="secondary" pt={1}>
                <i>{helpText}</i>
              </Typography>
            )}
          </>
        )
      case 'select':
        return (
          <>
            <FormControl>
              <InputLabel id={label}>{label}</InputLabel>
              <Controller
                as={
                  <Select labelId={label} label={label}>
                    {options.map(option => option)}
                  </Select>
                }
                name={name}
                control={control}
                defaultValue={options[0]}
              />
            </FormControl>
          </>
        )
      case 'textarea':
        return (
          <>
            <TextFielder
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error}
              type={type}
              multiline
              rows={4}
            />
            {!!helpText && (
              <Typography fontSize="14px" color="secondary" pt={1}>
                <i>{helpText}</i>
              </Typography>
            )}
          </>
        )
      case 'auto':
      case 'auto-multi':
        return (
          <>
            <Autocomplete
              fullWidth
              multiple={type === 'auto-multi'}
              options={options || []}
              filterSelectedOptions
              renderInput={params => (
                <TextFielder label={label} {...params} error={error} />
              )}
              getOptionLabel={
                typeof options[0] === 'object'
                  ? option => option?.name
                  : option => option
              }
              value={valueForAuto}
              onChange={handleAutocompleteChange}
              inputValue={inputValue}
              onInputChange={(e, v) => {
                setInputValue(v)
              }}
              openOnFocus
            />
            {!!helpText && (
              <Typography fontSize="14px" color="secondary">
                <i>{helpText}</i>
              </Typography>
            )}
          </>
        )
      default:
        return (
          <>
            <TextFielder
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={error}
              type={type}
            />
            {!!helpText && (
              <Typography fontSize="14px" color="secondary" pt={1}>
                <i>{helpText}</i>
              </Typography>
            )}
          </>
        )
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return renderField({ field, fieldState })
      }}
    />
  )
}

export default FormField
