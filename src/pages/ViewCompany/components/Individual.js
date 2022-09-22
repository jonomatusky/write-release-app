import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Box, Typography, Card, CardActionArea } from '@mui/material'

import ResponsiveAvatar from 'components/ResponsiveAvatar'
import useFetchAvatar from 'hooks/use-fetch-avatar'

const Individual = ({ individual }) => {
  const { avatarUrl, name, title, id } = individual || {}

  useFetchAvatar(id)

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardActionArea component={RouterLink} to={'/profiles/' + id}>
          <Box p={1} pt={2} width="150px">
            <Grid container>
              <Grid item xs={12} textAlign="center" pb={1}>
                <Box width="100%">
                  <Box maxWidth="100px" margin="auto" position="relative">
                    <ResponsiveAvatar avatarUrl={avatarUrl} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                {name && (
                  <Box
                    display="flex"
                    flexWrap="none"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                  >
                    <Typography
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      <b>{name}</b>
                    </Typography>
                  </Box>
                )}
                {title && (
                  <Box
                    display="flex"
                    flexWrap="none"
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    width="100%"
                  >
                    <Typography
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      variant="subtitle2"
                    >
                      {title}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
export default Individual
