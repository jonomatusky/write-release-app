import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Link,
  Button,
  Chip,
  IconButton,
} from '@mui/material'

import useRequest from 'hooks/use-request'
import LinkPreview from 'components/LinkPreview'

import { individual } from 'util/sampleData'
import BasicInfo from './components/PanelBasics/PanelBasics'
import PanelContact from './components/PanelContact/PanelContact'
import { Edit } from '@mui/icons-material'
import ChipTeam from './components/ChipTeam'
import PanelTags from './components/PanelTags/PanelTags'
import PanelBio from './components/PanelBio/PanelBio'

const ViewProfile = () => {
  // const [individual, setIndividual] = useState()
  // const { id } = useParams()

  // const { request, status } = useRequest()

  // useEffect(() => {
  //   if (status === 'idle') {
  //     try {
  //       let res = request({
  //         url: `/individuals/${id}`,
  //       })
  //     } catch (err) {
  //       // handled by request
  //     }
  //   }

  //   setIndividual(res.individual)
  // })

  const { bio, highlights } = individual || {}

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} mt={2} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={3}
          container
          spacing={2}
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Grid item xs={12}>
            <BasicInfo individual={individual} />
          </Grid>
          <Grid item xs={12}>
            <PanelContact individual={individual} />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <ChipTeam team={individual.team} />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PanelTags individual={individual} />
            </Grid>
            <Grid item xs={12}>
              <PanelBio individual={individual} />
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined">
                <Box p={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography color="primary" variant="h6">
                        <b>Media Highlights</b>
                      </Typography>
                    </Grid>
                    {highlights.map(({ url, image, title, source, id }) => {
                      return (
                        <Grid item xs={12} md={6} key={id}>
                          <LinkPreview
                            url={url}
                            image={image}
                            title={title}
                            source={source}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
export default ViewProfile
