import {
  Add,
  Check,
  FlagOutlined,
  ThumbDown,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpOffAlt,
} from '@mui/icons-material'
import { Card, IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import useRequest from 'hooks/use-request'
import React, { useState } from 'react'

const GeneratedOption = ({ generation, onClick }) => {
  const [isGood, setIsGood] = useState(generation.isGood)
  const [isBad, setIsBad] = useState(generation.isBad)
  const [wasSelected, setWasSelected] = useState(generation.isBad)

  const { request } = useRequest()

  const handleUpdate = async updates => {
    try {
      request({
        url: `/generator/choices/${generation.id}`,
        method: 'PATCH',
        data: updates,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSelect = async () => {
    if (wasSelected) {
      return
    }
    setWasSelected(true)
    onClick(generation.id)

    handleUpdate({ isGood: !isBad, wasSelected: true })

    setIsGood(!isBad)
    setWasSelected(true)
  }

  const handleUpvote = () => {
    handleUpdate({ isGood: true, isBad: false })
    setIsGood(true)
    setIsBad(false)
  }

  const handleDownvote = () => {
    handleUpdate({ isBad: true, isGood: false })
    setIsBad(true)
    setIsGood(false)
  }

  const [isHovering, setIsHovering] = useState(false)

  return (
    <Card variant="outlined" color="inherit">
      {/* <CardActionArea onClick={handleClick}> */}
      <Box display="flex" alignItems="center" p={1} pl={2}>
        <Box flexGrow={1} mr={1}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {generation.text}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box color="grey.600">
            <Tooltip
              placement="right"
              title={isGood ? 'Upvoted' : 'Upvote this suggestion'}
              enterDelay={750}
            >
              <IconButton
                size="small"
                color={isGood ? 'primary' : 'inherit'}
                onClick={isGood ? () => {} : handleUpvote}
              >
                {isGood ? (
                  <ThumbUp fontSize="small" />
                ) : (
                  <ThumbUpOffAlt fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip
            placement="right"
            title={wasSelected ? 'Added to Editor' : 'Add to editor'}
            enterDelay={750}
          >
            <Box>
              <IconButton
                onClick={handleSelect}
                sx={{
                  mt: 1,
                  mb: 1,
                  color: 'secondary.contrastText',
                  backgroundColor: 'secondary.main',
                  '&:hover, &.Mui-focusVisible': {
                    backgroundColor: 'secondary.dark',
                  },
                }}
                alt="Add to editor"
                disabled={wasSelected}
              >
                {wasSelected ? <Check /> : <Add />}
              </IconButton>
            </Box>
          </Tooltip>
          <Box color="grey.600">
            <Tooltip
              placement="right"
              title={
                isBad
                  ? 'Downvoted/Flagged'
                  : 'Downvote this suggestion and flag for review'
              }
              enterDelay={750}
            >
              <IconButton
                size="small"
                color={isBad ? 'primary' : 'inherit'}
                onClick={isBad ? () => {} : handleDownvote}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isBad ? (
                  <ThumbDown fontSize="small" />
                ) : isHovering ? (
                  <FlagOutlined fontSize="small" />
                ) : (
                  <ThumbDownOffAlt fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {/* </CardActionArea> */}
    </Card>
  )
}

export default GeneratedOption
