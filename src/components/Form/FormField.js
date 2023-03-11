import React from 'react'
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
} from '@mui/material'
import TextFielder from 'components/TextFielder'
import Autocompleter from 'components/Autocompleter'

const FormField = ({
  name,
  label,
  type,
  helpText,
  placeholder,
  control,
  options,
  onAddItem,
  AddDialog,
  addDialogProps,
  disabled,
}) => {
  const renderField = ({ field, fieldState }) => {
    const { onChange, onBlur, value } = field

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
              disabled={disabled}
              helpText={helpText}
            />
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
              disabled={disabled}
              helpText={helpText}
            />
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
              rows={8}
              // minRows={4}
              disabled={disabled}
              helpText={helpText}
            />
          </>
        )
      case 'auto':
      case 'auto-multi':
        return (
          <>
            <Autocompleter
              label={label}
              error={error}
              multi={type === 'auto-multi'}
              options={options}
              value={value}
              onChange={onChange}
              onAddItem={onAddItem}
              AddDialog={AddDialog}
              addDialogProps={addDialogProps}
              disabled={disabled}
              helpText={helpText}
            />
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
              disabled={disabled}
              helpText={helpText}
            />
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
