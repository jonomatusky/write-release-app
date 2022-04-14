import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid } from '@mui/material'

import BasicInfo from './components/PanelBasics/PanelBasics'
import PanelContact from './components/PanelContact/PanelContact'
import ChipTeam from './components/ChipTeam'
import PanelTags from './components/PanelTags/PanelTags'
import PanelBio from './components/PanelBio/PanelBio'
import PanelHighlights from './components/PanelHighlights/PanelHighlights'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'

const ViewProfile = () => {
  const { fetchStatus, get, select } = useIndividualsStore()
  const { pid } = useParams()
  const individual = select(pid)

  useEffect(() => {
    get(pid)
  }, [pid, get])

  const showError = !individual && fetchStatus === 'failed'
  const showLoading = !showError && !individual.id

  return (
    <>
      {showLoading && <Loading />}
      {showError && <NotFound />}
      {!showLoading && !showError && (
        <Container maxWidth="md">
          <Grid container spacing={2} justifyContent="center" pt={2} pb={2}>
            <ChipTeam team={individual.team} />

            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={3}
              container
              spacing={2}
              alignContent="start"
            >
              <BasicInfo individual={individual} />
              <PanelContact individual={individual} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={9}
              container
              spacing={2}
              alignContent="start"
            >
              <PanelTags individual={individual} />
              <PanelBio individual={individual} />
              <PanelHighlights individual={individual} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}
export default ViewProfile
