import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const GridButtons = ({ onNext, onBack, disabled }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <ToggleButtonGroup>
          <ToggleButton
            value="up"
            aria-label="up"
            disabled={onBack === undefined}
            onClick={onBack}
          >
            <KeyboardArrowUp fontSize="large" />
          </ToggleButton>
          <ToggleButton
            value="right"
            aria-label="right"
            disabled={onNext === undefined || disabled}
            onClick={onNext}
          >
            <KeyboardArrowDown fontSize="large" />
          </ToggleButton>
        </ToggleButtonGroup>
        {/* <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={onBack}
          sx={{ minWidth: '0', pr: 1, pl: 1 }}
          disabled={onBack === undefined}
          mr={1}
        >
          <KeyboardArrowUp fontSize="large" />
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={onNext}
          sx={{ minWidth: '0', pr: 1, pl: 1 }}
        >
          <KeyboardArrowDown fontSize="large" />
        </Button> */}
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={onNext}
        disabled={disabled}
      >
        <Typography variant="h6" fontWeight="bold" component="p">
          Next
        </Typography>
      </Button>
    </Box>
  )
}

export default GridButtons
