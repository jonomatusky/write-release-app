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

const FormField = ({ formField, control, options }) => {
  const { name, label, type, helpText, placeholder } = formField

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
              error={Boolean(error)}
              helperText={error?.message}
              type="date"
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
              error={Boolean(error)}
              helperText={error?.message}
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
              error={Boolean(error)}
              helperText={error?.message}
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
      default:
        return (
          <>
            <TextFielder
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={Boolean(error)}
              helperText={error?.message}
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
