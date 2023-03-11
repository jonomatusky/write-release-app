import { Card, CardActionArea, Checkbox, Typography } from '@mui/material'
import { Box } from '@mui/system'
// import useRequest from 'hooks/use-request'
import React from 'react'

const GeneratedOption = ({ generation, selected, onSelected }) => {
  // const { request } = useRequest()

  // const handleUpdate = async updates => {
  //   try {
  //     request({
  //       url: `/generator/choices/${generation.id}`,
  //       method: 'PATCH',
  //       data: updates,
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleSelect = async () => {
    onSelected()

    // handleUpdate({ wasSelected: true })
  }

  return (
    <Card variant="outlined" color={selected ? 'primary' : 'inherit'}>
      <CardActionArea onClick={handleSelect}>
        <Box display="flex" alignItems="center" p={1} pl={2}>
          <Box flexGrow={1} mr={1}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {generation.text.trim()}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Checkbox checked={selected} />
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default GeneratedOption
