import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Grid, Box, Button, Chip } from '@mui/material'

import BasicInfo from './components/PanelBasicsIndividual'
import PanelTags from 'components/PanelTags'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import useGetIndividual from 'hooks/use-get-individual'
import ButtonContact from 'components/ButtonContact'
import useHistoryStore from 'hooks/store/use-history-store'
import { ArrowBackIos, Settings } from '@mui/icons-material'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './components/DialogEditSettings'
import PanelBullets from 'components/PanelBullets/PanelBullets'
import useSession from 'hooks/use-session'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useFetchCoverage from 'hooks/use-fetch-coverage'
import PanelCoverage from 'components/PanelCoverage'
import usePageTitle from 'hooks/use-page-title'
import FabContact from 'components/FabContact'

const ViewProfile = () => {
  const { id } = useParams()
  const { user } = useSession()
  const { select, update, updateStatus } = useIndividualsStore()
  const individual = select(id)
  let {
    facts,
    points,
    tags,
    mediaTrained,
    quickToBook,
    frequentSource,
    avatarUrl,
    location,
    title,
    name,
    organization: orgId,
  } = individual
  const { select: selectOrganization } = useOrganizationsStore()
  const qualities = { mediaTrained, quickToBook, frequentSource }
  tags = tags || []
  facts = facts || []
  points = points || []

  const organization = selectOrganization(orgId) || {}
  const { team } = organization

  const basics = { id, avatarUrl, name, location, title, organization }

  const { history } = useHistoryStore()

  const { status } = useGetIndividual(id)

  const { coverage } = useFetchCoverage({
    object: 'individual',
    id,
  })

  const navigate = useNavigate()

  usePageTitle((!!name ? name + ' | ' : '') + 'SourceOn')

  const factsPlaceholders = [
    `Founded her first lemonade stand at age 14 on her parent's front lawn`,
    'Graduated from the school of hard knocks with a minor in street smarts',
    'Previously the head of Roadrunner deterrents at Acme Inc.',
    'Fights Crime as Batman in his spare time',
    'Contributing author of "Funny Fake Bullets" at Joxios',
  ]

  const handleUpdate = async values => {
    console.log(id)
    console.log(values)
    try {
      await update({ id, ...values })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {(status === 'loading' || status === 'idle') && <Loading />}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && (
        <>
          {!!user && (
            <Box
              color="primary"
              position="absolute"
              right={12}
              zIndex="100"
              variant="extended"
              pt={2}
            >
              <Box color="grey.500">
                {team && <Chip label={team} />}
                <ButtonEditPanel
                  icon={Settings}
                  sx={{ ml: 0.25 }}
                  padding={0}
                  size="medium"
                  dialog={DialogEditSettings}
                />
              </Box>
            </Box>
          )}
          {history.length > 1 && !!user && (
            <Box
              color="primary"
              position="absolute"
              left={12}
              zIndex="100"
              variant="extended"
              pt={2}
            >
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIos />}
                color="secondary"
              >
                Back
              </Button>
            </Box>
          )}

          <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center" pt={2} pb={2}>
              {!!user && (
                <Grid
                  item
                  xs={12}
                  textAlign="end"
                  sx={{ display: { xs: 'flex', lg: 'none' } }}
                >
                  <Box sx={{ visibility: 'hidden' }}>
                    {team && <Chip label={team} />}
                    <ButtonEditPanel
                      icon={Settings}
                      sx={{ ml: 0.25 }}
                      padding={0}
                      size="medium"
                    />
                  </Box>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                sm={4}
                container
                spacing={2}
                alignContent="start"
              >
                <Grid item xs={12}>
                  <BasicInfo {...basics} />
                </Grid>
                {(!!user || tags.length > 0) && (
                  <Grid item xs={12}>
                    <PanelTags
                      tags={tags}
                      qualities={qualities}
                      update={handleUpdate}
                      updateStatus={updateStatus}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Box textAlign="center" width="100%">
                    <ButtonContact id={id} type="individual" />
                  </Box>
                </Grid>
              </Grid>
              {(!!user ||
                facts.length > 0 ||
                points.length > 0 ||
                coverage.length > 0) && (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  container
                  spacing={2}
                  alignContent="start"
                >
                  {(!!user || facts.length > 0) && (
                    <Grid item xs={12}>
                      <PanelBullets
                        title="Fast Facts"
                        bullets={facts}
                        field="facts"
                        placeholders={factsPlaceholders}
                        update={handleUpdate}
                        updateStatus={updateStatus}
                      />
                    </Grid>
                  )}
                  {(!!user || facts.length > 0) && (
                    <Grid item xs={12}>
                      <PanelBullets
                        title="Talking Points"
                        bullets={points}
                        field="points"
                        update={handleUpdate}
                        updateStatus={updateStatus}
                      />
                    </Grid>
                  )}
                  {(!!user || coverage.length > 0) && (
                    <Grid item xs={12}>
                      <PanelCoverage
                        individual={id}
                        organization={orgId}
                        coverage={coverage}
                        label={'Recent Coverage'}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Container>
          <FabContact id={id} type="individual" />
        </>
      )}
    </>
  )
}
export default ViewProfile
