import { Delete, DragIndicator } from '@mui/icons-material'
import { IconButton, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

const BulletItem = ({
  bullet,
  index,
  onSubmit,
  onDelete,
  dragHandleProps,
  placeholders,
}) => {
  const [value, setValue] = useState(bullet.text || '')

  useEffect(() => {
    setValue(bullet.text)
  }, [bullet])

  return (
    <Box pt={0.5} pb={0.5}>
      <Paper variant="outlined">
        <Box
          p={1}
          width="100%"
          maxWidth="100%"
          display="flex"
          alignItems="center"
        >
          <Box
            flexGrow={1}
            pl={1}
            pt={1}
            display="flex"
            alignItems="center"
            maxWidth="100%"
          >
            <Box pr={1} display="flex" alignItems="start" height="100%">
              •{' '}
            </Box>
            {/* <InlineTextEdit
              text={value}
              // placeholder="Your Experience"
              type="input"
              submit={() => onSubmit(value)}
            > */}
            <TextField
              variant="standard"
              type="text"
              name="index"
              fullWidth
              placeholder={
                (placeholders || [])[index] || 'Bullet #' + (index + 1)
              }
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={() => onSubmit(value)}
              size="small"
              multiline
              // rows={2}
              autoFocus={true}
              InputProps={{ disableUnderline: true }}
            />
            {/* </InlineTextEdit> */}
          </Box>
          <Box
            {...dragHandleProps}
            flexShrink={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minWidth="45px"
          >
            <IconButton size="small" onClick={onDelete}>
              <Delete />
            </IconButton>
          </Box>
          <Box
            {...dragHandleProps}
            flexShrink={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minWidth="30px"
          >
            <DragIndicator />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default BulletItem
