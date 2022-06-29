import React, { useEffect, useState } from 'react'
import { Container, Grid, Box, CircularProgress, Button } from '@mui/material'
import Panel from 'layouts/Panel'
import FuzzySearch from 'fuzzy-search'
import InfiniteScroll from 'react-infinite-scroll-component'
import FabAdd from './FabAdd'
import usePageTitle from 'hooks/use-page-title'
import LayoutDrawer from 'layouts/LayoutDrawer'
import { useSearchParams } from 'react-router-dom'
import TagBar from 'components/TagBar'
import SearchBar from 'components/SearchBar'
import IndustriesBar from 'components/IndustriesBar'
import { Clear } from '@mui/icons-material'
import OrgBar from './OrgBar'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const ViewIndexPage = ({ items, Item, type }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { items: organizations } = useOrganizationsStore()

  const search = searchParams.get('search') || ''
  const industries = searchParams.getAll('ind') || []
  const company = searchParams.get('company') || ''
  const tags = searchParams.getAll('tag') || []

  const [searchValue, setSearchValue] = useState(search)

  usePageTitle()

  const [chunkCount, setChunkCount] = useState(1)

  const sorted = [...items].sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  const searcher = new FuzzySearch(sorted, ['name'], { sort: true })
  const result = searcher.search(search)

  let list = result

  if (tags.length > 0) {
    list = result.filter(organization =>
      tags.some(value => organization.tags.map(tag => tag.name).includes(value))
    )
  }

  if (industries.length > 0) {
    if (type === 'organization') {
      list = list.filter(organization =>
        industries.includes((organization.industry || {}).name)
      )
    } else {
      const orgsFiltered = organizations.filter(organization =>
        industries.includes((organization.industry || {}).name)
      )
      list = list.filter(individual =>
        orgsFiltered
          .map(organization => organization.id)
          .includes(individual.organization)
      )
    }
  }

  if (!!company && company !== '') {
    list = list.filter(item => item.organization === company)
  }

  const chunks = []
  const chunkSize = 12

  for (let i = 0; i < list.length; i += chunkSize) {
    const chunk = list.slice(i, i + chunkSize)
    chunks.push(chunk)
  }

  const itemsOnScreen = []

  chunks.forEach((chunk, index) => {
    if (index < chunkCount) {
      itemsOnScreen.push(...chunk)
    }
  })

  const addMoreOrganizations = () => {
    setChunkCount(chunkCount + 1)
  }

  const handleUpdateSearch = value => {
    setSearchValue(value)
  }

  useEffect(() => {
    const sv = searchValue

    const timeout = setTimeout(() => {
      const is = searchParams.getAll('ind') || []
      const ts = searchParams.getAll('tag') || []
      const c = searchParams.get('company') || ''
      const s = searchParams.get('search') || ''

      if (sv === searchValue && sv !== s) {
        console.log('setting search')
        let params = !!sv && sv !== '' ? [['search', sv]] : []
        if (!!c && c !== '') {
          params = [...params, ['company', c]]
        }
        if (!!is && is.length > 0) {
          params = [...params, ...is.map(v => ['ind', v])]
        }
        if (!!ts && ts.length > 0) {
          params = [...params, ...ts.map(v => ['tag', v])]
        }
        setSearchParams(new URLSearchParams(params))
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [searchValue, searchParams, setSearchParams])

  const handleSetCompany = v => {
    let params = !!search && search !== '' ? [['search', search]] : []
    if (!!v && v !== '') {
      params = [...params, ['company', v]]
    }
    if (!!industries && industries.length > 0) {
      params = [...params, ...industries.map(v => ['ind', v])]
    }
    if (!!tags && tags.length > 0) {
      params = [...params, ...tags.map(v => ['tag', v])]
    }
    setSearchParams(new URLSearchParams(params))
  }

  const handleSetIndustries = (e, vs) => {
    let params = !!search && search !== '' ? [['search', search]] : []
    if (!!company && company !== '') {
      params = [...params, ['company', company]]
    }
    params = [...params, ...vs.map(v => ['ind', v])]
    if (!!tags && tags.length > 0) {
      params = [...params, ...tags.map(v => ['tag', v])]
    }
    setSearchParams(new URLSearchParams(params))
  }

  const handleSetTags = (e, vs) => {
    let params = !!search && search !== '' ? [['search', search]] : []
    if (!!company && company !== '') {
      params = [...params, ['company', company]]
    }
    if (!!industries && industries.length > 0) {
      params = [...params, ...industries.map(v => ['ind', v])]
    }
    params = [...params, ...vs.map(v => ['tag', v])]
    setSearchParams(new URLSearchParams(params))
  }

  const clear = () => {
    setSearchValue('')
    setSearchParams(new URLSearchParams())
  }

  return (
    <LayoutDrawer>
      <Container maxWidth="lg">
        <FabAdd type={type} />
        <Box width="100%" display="flex" mt={2}>
          <Box
            width="350px"
            pr={2}
            sx={{ display: { xs: 'none', md: 'block' } }}
            position="fixed"
            flexShrink={0}
          >
            <Panel>
              <Box p={2} display="flex">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <SearchBar
                      value={searchValue}
                      setValue={handleUpdateSearch}
                    />
                  </Grid>
                  {type === 'individual' && (
                    <Grid item xs={12}>
                      <OrgBar
                        value={company}
                        setValue={handleSetCompany}
                        disablePortal
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <IndustriesBar
                      values={industries}
                      setValues={handleSetIndustries}
                      disablePortal
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TagBar
                      values={tags}
                      setValues={handleSetTags}
                      disablePortal
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={clear} endIcon={<Clear />} fullWidth>
                      clear
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Panel>
          </Box>
          <Box
            width="350px"
            pr={2}
            sx={{ display: { xs: 'none', md: 'block' } }}
            visibility="hidden"
            flexShrink={0}
          />
          <Box flexGrow={1} width="100px">
            <InfiniteScroll
              dataLength={itemsOnScreen.length}
              next={addMoreOrganizations}
              hasMore={itemsOnScreen.length < list.length}
              loader={
                <Grid container mt={2} mb={2}>
                  <Grid item xs={12} lg={9} textAlign="center">
                    <CircularProgress />
                  </Grid>
                </Grid>
              }
            >
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <Box width="100%">
                    <Panel>
                      <Box p={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <SearchBar
                              value={search}
                              setValue={handleUpdateSearch}
                            />
                          </Grid>
                          {type === 'individual' && (
                            <Grid item xs={12}>
                              <OrgBar
                                value={company}
                                setValue={handleSetCompany}
                              />
                            </Grid>
                          )}
                          <Grid item xs={12}>
                            <IndustriesBar
                              values={industries}
                              setValues={handleSetIndustries}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TagBar values={tags} setValues={handleSetTags} />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              onClick={clear}
                              endIcon={<Clear />}
                              fullWidth
                            >
                              Clear Search
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Panel>
                  </Box>
                </Grid>
                {itemsOnScreen.map(item => (
                  <Grid item xs={12} lg={9} key={item.id}>
                    <Item id={item.id} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          </Box>
        </Box>
      </Container>
    </LayoutDrawer>
  )
}

export default ViewIndexPage
