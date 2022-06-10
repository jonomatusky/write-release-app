import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box } from '@mui/material'

import BasicInfo from './components/PanelBasics/PanelBasics'
import ChipTeam from './components/ChipTeam'
import PanelTags from './components/PanelTags/PanelTags'
import PanelHighlights from './components/PanelHighlights/PanelHighlights'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import useGetIndividual from 'hooks/use-get-individual'
// import useFetchAvatar from 'hooks/use-fetch-avatar'
import PanelFacts from './components/PanelFacts/PanelFacts'
import ButtonContact from './components/ButtonContact'
import PanelPoints from './components/PanelPoints/PanelPoints'
import PanelContact from './components/PanelContact/PanelContact'
// import useIndividualsStore from 'hooks/store/use-individuals-store'

const ViewProfile = () => {
  const { pid } = useParams()

  const { status } = useGetIndividual(pid)

  return (
    <>
      {(status === 'loading' || status === 'idle') && <Loading />}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && (
        <>
          <Box
            color="primary"
            position="absolute"
            // top={24}
            right={12}
            zIndex="100"
            variant="extended"
            pt={2}
          >
            <ChipTeam id={pid} />
          </Box>

          <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center" pt={2} pb={2}>
              <Grid
                item
                xs={12}
                textAlign="end"
                sx={{ display: { xs: 'flex', lg: 'none' } }}
              >
                <ChipTeam id={pid} sx={{ visibility: 'hidden' }} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                container
                spacing={2}
                alignContent="start"
              >
                <BasicInfo id={pid} />
                <PanelTags id={pid} />
                <PanelContact id={pid} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                container
                spacing={2}
                alignContent="start"
              >
                <PanelFacts id={pid} />
                <PanelPoints id={pid} />
                <PanelHighlights id={pid} />
              </Grid>
            </Grid>
          </Container>
          <ButtonContact id={pid} />
        </>
      )}
    </>
  )
}
export default ViewProfile
