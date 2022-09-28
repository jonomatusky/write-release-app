import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import Panel from 'layouts/Panel'
import FuzzySearch from 'fuzzy-search'
import InfiniteScroll from 'react-infinite-scroll-component'
import usePageTitle from 'hooks/use-page-title'
import LayoutDrawer from 'layouts/LayoutDrawer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TagBar from 'components/TagBar'
import SearchBar from 'components/SearchBar'
import IndustriesBar from 'components/IndustriesBar'
import { Add, Clear } from '@mui/icons-material'
import OrgBar from './OrgBar'
import useOrganizationsStore from 'hooks/store/use-organizations-store'

const ViewIndexPage = ({ items, Item, type, mode, Dialog, Icon }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { items: organizations } = useOrganizationsStore()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)

  const { select: selectOrganization } = useOrganizationsStore()

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
  const chunkSize = mode === 'list' ? 24 : 12

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

  const addMore = () => {
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

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelectedId(null)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef)

  return (
    <LayoutDrawer>
      <Container maxWidth="lg">
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
                    <Button
                      onClick={() => (window.location.hash = '#create')}
                      endIcon={Icon ? <Icon /> : <Add />}
                      variant="contained"
                      fullWidth
                    >
                      Create New
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <SearchBar
                      value={searchValue}
                      setValue={handleUpdateSearch}
                    />
                  </Grid>
                  {(type === 'individual' || type === 'content') && (
                    <Grid item xs={12}>
                      <OrgBar
                        value={company}
                        setValue={handleSetCompany}
                        disablePortal
                      />
                    </Grid>
                  )}
                  {type !== 'content' && (
                    <Grid item xs={12}>
                      <IndustriesBar
                        values={industries}
                        setValues={handleSetIndustries}
                        disablePortal
                      />
                    </Grid>
                  )}
                  {type !== 'content' && (
                    <Grid item xs={12}>
                      <TagBar
                        values={tags}
                        setValues={handleSetTags}
                        disablePortal
                      />
                    </Grid>
                  )}
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
              next={addMore}
              hasMore={itemsOnScreen.length < list.length}
              loader={
                <Grid container mt={2} mb={2}>
                  <Grid item xs={12} lg={9} textAlign="center">
                    <CircularProgress />
                  </Grid>
                </Grid>
              }
            >
              <div ref={wrapperRef}>
                <Grid container spacing={2} mb={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                  >
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
                  {mode === 'list' || !Item ? (
                    <Grid item xs={12} lg={9}>
                      <Paper variant="outlined" sx={{ width: '100%' }}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell width="45%">Name</TableCell>
                                <TableCell>Company</TableCell>
                                {/* <TableCell>Owner</TableCell> */}
                                <TableCell align="right">
                                  Last Modified
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {itemsOnScreen.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={3} align="center">
                                    No results found
                                  </TableCell>
                                </TableRow>
                              )}
                              {itemsOnScreen.length > 0 &&
                                itemsOnScreen.map((item, i) => (
                                  <TableRow
                                    key={i}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                      if (selectedId === item.id) {
                                        navigate('/content/' + item.id)
                                      } else {
                                        setSelectedId(item.id)
                                      }
                                    }}
                                    selected={selectedId === item.id}
                                  >
                                    <TableCell
                                      width="50%"
                                      sx={{
                                        maxWidth: 0,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {item.name ||
                                        item.title ||
                                        item.titleInternal ||
                                        'No Title'}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        maxWidth: 0,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {
                                        selectOrganization(
                                          (item.organizations || [])[0]
                                        )?.name
                                      }
                                    </TableCell>
                                    {/* <TableCell
                                  sx={{
                                    maxWidth: 0,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {item.owner}
                                </TableCell> */}
                                    <TableCell
                                      align="right"
                                      sx={{
                                        maxWidth: 0,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {/* <Box
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  > */}
                                      {new Date(
                                        item.updatedAt || item.createdAt
                                      ).toLocaleDateString('en-us', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                      })}
                                      {/* </Box> */}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  ) : (
                    itemsOnScreen.map(item => (
                      <Grid item xs={12} lg={9} key={item.id}>
                        <Item id={item.id} />
                      </Grid>
                    ))
                  )}
                </Grid>
              </div>
            </InfiniteScroll>
          </Box>
        </Box>
      </Container>
    </LayoutDrawer>
  )
}

export default ViewIndexPage
