import React, { forwardRef } from 'react'
import TextFielder from './TextFielder'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Box } from '@mui/system'

const DateSelector = ({ value, onChange, label, onBlur }) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Box ref={ref}>
      <TextFielder
        label={label}
        placeholder={new Date().toLocaleDateString()}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type="date"
        onClick={onClick}
      />
    </Box>
  ))

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      customInput={<ExampleCustomInput />}
    />
  )
}

export default DateSelector
