import React from 'react'
import { Container, Grid, Box, Paper, Typography } from '@mui/material'

import { individual } from 'util/sampleData'
import BasicInfo from './components/PanelBasics/PanelBasics'
import PanelContact from './components/PanelContact/PanelContact'
import ChipTeam from './components/ChipTeam'
import PanelTags from './components/PanelTags/PanelTags'
import PanelBio from './components/PanelBio/PanelBio'
import PanelHighlights from './components/PanelHighlights/PanelHighlights'
import useSession from 'hooks/use-session'

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

  const { bio, highlights } = individual
  const { user } = useSession()

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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PanelTags individual={individual} />
            </Grid>

            {(!!user || bio) && (
              <Grid item xs={12}>
                <PanelBio individual={individual} />
              </Grid>
            )}

            {(!!user || (highlights && highlights.length > 0)) && (
              <Grid item xs={12}>
                <PanelHighlights individual={individual} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
export default ViewProfile
