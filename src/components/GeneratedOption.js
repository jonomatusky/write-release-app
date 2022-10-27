import { Add } from '@mui/icons-material'
import { Card, CardActionArea, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const GeneratedOption = ({ index, text, onClick }) => {
  const handleClick = () => {
    onClick(index)
  }

  return (
    <Card variant="outlined" color="inherit">
      <CardActionArea onClick={handleClick}>
        <Box display="flex" alignItems="center" p={1}>
          <Box flexGrow={1}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {text}
            </Typography>
          </Box>
          <Box>
            <IconButton color="inherit" size="small" ml={1}>
              <Add />
            </IconButton>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default GeneratedOption
