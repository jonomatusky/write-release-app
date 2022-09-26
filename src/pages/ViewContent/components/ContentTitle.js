// Editable.js
import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material'

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const ContentName = ({ text, type, children, childRef, submit, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  const [isEditing, setEditing] = useState(false)
  // let isEditing = true
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus()
    }
  }, [isEditing, childRef])

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    const { key } = event
    const keys = ['Escape', 'Tab']
    const enterKey = 'Enter'
    const allKeys = [...keys, enterKey] // All keys array

    if (allKeys.indexOf(key) > -1) {
      setEditing(false)
      submit()
    }

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    // if (
    //   (type === 'textarea' && keys.indexOf(key) > -1) ||
    //   (type !== 'textarea' && allKeys.indexOf(key) > -1)
    // ) {
    //   setEditing(false)
    // }
  }

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/

  return (
    <Box
      height="30px"
      // maxWidth="500px"
      pt={1}
      alignItems="center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isEditing ? (
        <Box display="flex">
          <Box
            overflow="hidden"
            onBlur={() => setEditing(false)}
            onKeyDown={e => handleKeyDown(e, type)}
            width="100%"
          >
            <Box position="relative">{children}</Box>

            <Box
              flexGrow={1}
              overflow="hidden"
              visibility="hidden"
              position="relative"
              zIndex="-1"
              top={-20}
            >
              <Typography
                variant="subtitle1"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                lineHeight={1.6}
                color={!!text ? 'null' : 'disabled'}
              >
                {text || ''}
              </Typography>
            </Box>
          </Box>
          {/* <Box pt="3px" width="25px"></Box> */}
        </Box>
      ) : (
        <Box
          display="flex"
          width="100%"
          onClick={() => setEditing(true)}
          borderBottom="2px solid #00000000"
          height="29px"
          // pt="1px"
        >
          <Box flexGrow={1} overflow="hidden">
            <Typography
              variant="subtitle1"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              lineHeight={1.6}
              color={!!text ? 'null' : 'disabled'}
            >
              {text || ''}
            </Typography>
          </Box>
          <Box pt="3px" width="25px">
            {isHovering && <Edit fontSize="small" />}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ContentName
