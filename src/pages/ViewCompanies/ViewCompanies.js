import React, { useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Autocomplete,
  CircularProgress,
} from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import OrganizationCard from './components/OrganizationCard'
import Panel from 'layouts/Panel'
import TextFielder from 'components/TextFielder'
import useTagsStore from 'hooks/store/use-tags-store'
import FuzzySearch from 'fuzzy-search'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonAddCompany from './components/ButtonAddCompany'
import usePageTitle from 'hooks/use-page-title'
import LayoutDrawer from 'layouts/LayoutDrawer'

const ViewCompanies = () => {
  const { items: organizations } = useOrganizationsStore()
  const { items: tags } = useTagsStore()

  usePageTitle()

  const options = tags.map(tag => tag.name)

  const [search, setSearch] = useState('')
  const [values, setValues] = useState([])
  const [chunkCount, setChunkCount] = useState(1)
  const [inputValue, setInputValue] = useState('')

  const organizationsSorted = [...organizations].sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  const searcher = new FuzzySearch(organizationsSorted, ['name', 'company'])
  const result = searcher.search(search)

  let list = result

  if (values.length > 0) {
    list = result.filter(organization =>
      values.some(value =>
        organization.tags.map(tag => tag.name).includes(value)
      )
    )
  }

  const chunks = []
  const chunkSize = 12

  for (let i = 0; i < list.length; i += chunkSize) {
    const chunk = list.slice(i, i + chunkSize)
    chunks.push(chunk)
  }

  const organizationsOnScreen = []

  chunks.forEach((chunk, index) => {
    if (index < chunkCount) {
      organizationsOnScreen.push(...chunk)
    }
  })

  const addMoreOrganizations = () => {
    setChunkCount(chunkCount + 1)
  }

  return (
    <LayoutDrawer>
      <Container maxWidth="lg">
        <ButtonAddCompany />
        <InfiniteScroll
          dataLength={organizationsOnScreen.length}
          next={addMoreOrganizations}
          hasMore={organizationsOnScreen.length < list.length}
          loader={
            <Grid container mt={2} mb={2}>
              <Grid item xs={12} textAlign="center">
                <CircularProgress />
              </Grid>
            </Grid>
          }
        >
          <Grid container spacing={2} mt={2} mb={2}>
            <Grid item xs={12}>
              <Panel>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        label="Tags"
                        multiple
                        options={options}
                        filterSelectedOptions
                        renderInput={params => (
                          <TextFielder label="Tags" {...params} />
                        )}
                        value={values}
                        onChange={(e, v) => {
                          setValues(v)
                        }}
                        inputValue={inputValue}
                        onInputChange={(e, v) => {
                          setInputValue(v)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextFielder
                        label="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Panel>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {organizationsOnScreen.map(organization => (
                  <Grid item xs={12} md={6} lg={4} key={organization.id}>
                    <OrganizationCard id={organization.id} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </InfiniteScroll>
      </Container>
    </LayoutDrawer>
  )
}

export default ViewCompanies
