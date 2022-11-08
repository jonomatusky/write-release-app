import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box, Chip } from '@mui/material'

import useSession from 'hooks/use-session'
import useFetchCoverage from 'hooks/use-fetch-coverage'
import PanelBasicsCompany from './components/PanelBasicsCompany'
import PanelTags from 'components/PanelTags'
import PanelCoverage from 'components/PanelCoverage'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import useGetOrganization from 'hooks/use-get-organization'
import FabContact from 'components/FabContact'
import ButtonContact from 'components/ButtonContact'
import PanelIndividuals from './components/PanelIndividuals'
import { Settings } from '@mui/icons-material'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import usePageTitle from 'hooks/use-page-title'
import PanelBullets from 'components/PanelBullets/PanelBullets'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettingsCompany from './components/DialogEditSettingsCompany'

const ViewCompany = () => {
  const { id } = useParams()
  const { user } = useSession()
  const { items: individuals } = useIndividualsStore()
  let { select, update, updateStatus } = useOrganizationsStore()
  const organization = select(id)
  let { facts, tags, logoUrl, name, location, website, industry, team } =
    organization
  facts = facts || []
  tags = tags || []

  usePageTitle((!!name ? name + ' | ' : '') + 'SourceOn')

  const basics = { logoUrl, name, location, website, industry }

  const { status } = useGetOrganization(id)

  const { coverage } = useFetchCoverage({
    object: 'organization',
    id,
  })

  const individualsFiltered =
    individuals.filter(item => item.organization === id) || []

  const factsPlaceholders = [
    `Leading provider of wigets and doodads on the east coast`,
    'Diverse team of expenienced executives with expertise in industry, business, and the business of industry',
    'Founded in 1985 by Dr. Emmett Brown in his makeshift laboratory/garage',
  ]

  const handleUpdate = async values => {
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
          <Box
            color="primary"
            position="absolute"
            right={12}
            zIndex="100"
            variant="extended"
            pt={2}
          >
            {!!user && (
              <Box color="grey.500">
                {team && <Chip label={team} />}
                <ButtonEditPanel
                  icon={Settings}
                  sx={{ ml: 0.25 }}
                  padding={0}
                  size="medium"
                  dialog={DialogEditSettingsCompany}
                />
              </Box>
            )}
          </Box>
          {/* {history.length > 1 && (
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
          )} */}

          <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center" pt={2} pb={2}>
              <Grid
                item
                xs={12}
                textAlign="end"
                sx={{ display: { xs: 'flex', lg: 'none' } }}
              >
                <Box visibility="hidden">
                  {team && <Chip label={team} />}
                  <ButtonEditPanel
                    icon={Settings}
                    sx={{ ml: 0.25 }}
                    padding={0}
                    size="medium"
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                container
                spacing={2}
                alignContent="start"
              >
                <Grid item xs={12}>
                  <PanelBasicsCompany {...basics} />
                </Grid>
                {(!!user || tags.length > 0) && (
                  <Grid item xs={12}>
                    <PanelTags
                      tags={tags}
                      update={handleUpdate}
                      updateStatus={updateStatus}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Box textAlign="center" width="100%">
                    <ButtonContact id={id} type="organization" />
                  </Box>
                </Grid>
              </Grid>
              {(!!user ||
                facts.length > 0 ||
                individualsFiltered.length > 0 ||
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
                  {(!!user || individualsFiltered.length > 0) && (
                    <Grid item xs={12}>
                      <PanelIndividuals
                        id={id}
                        individuals={individualsFiltered}
                      />
                    </Grid>
                  )}
                  {(!!user || coverage.length > 0) && (
                    <Grid item xs={12}>
                      <PanelCoverage
                        organization={id}
                        coverage={coverage}
                        label={'Recent Coverage'}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Container>
          <Box
            sx={{
              position: 'fixed',
              zIndex: '100',
              bottom: 24,
              right: 24,
            }}
          >
            <FabContact id={id} type="organization" />
          </Box>
        </>
      )}
    </>
  )
}
export default ViewCompany
