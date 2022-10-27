import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  Grid,
  CircularProgress,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import FabAdd from 'components/FabAdd'
import FuzzySearch from 'fuzzy-search'
import InfiniteScroll from 'react-infinite-scroll-component'
import usePageTitle from 'hooks/use-page-title'
// import LayoutDrawer from 'layouts/LayoutDrawer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Groups, NoteAdd, Person } from '@mui/icons-material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useContentStore from 'hooks/store/use-content-store'
import useFetchContent from 'hooks/use-fetch-content'
import useUsersStore from 'hooks/store/use-users-store'
import { Box } from '@mui/system'
import DialogAbout from 'pages/ViewCampaign/components/DialogAbout'
import Panel from 'layouts/Panel'
import useUserStore from 'hooks/store/use-user-store'
import HeaderViews from 'components/HeaderViews'
import useContentTypesStore from 'hooks/store/use-content-types-store'

const ViewCampaigns = () => {
  const type = 'content'
  const { items } = useContentStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const { items: organizations } = useOrganizationsStore()
  const { select: selectContentType } = useContentTypesStore()
  const { select: selectUser } = useUsersStore()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)
  const { item: user } = useUserStore()

  const { select: selectOrganization } = useOrganizationsStore()

  const search = searchParams.get('search') || ''
  const industries = searchParams.getAll('ind') || []
  const company = searchParams.get('company') || ''
  const tags = searchParams.getAll('tag') || []

  const [searchValue, setSearchValue] = useState(search)

  usePageTitle()
  useFetchContent()

  const [userFilter, setUserFilter] = useState(user.id)

  const [chunkCount, setChunkCount] = useState(1)

  const filtered = [...items].filter(item =>
    !userFilter ? true : item.owner === userFilter
  )

  const sorted = filtered
    .map(item => {
      return {
        ...item,
        owner: selectUser(item.owner)?.email,
        organization: selectOrganization(item.organizations[0])?.name,
        primaryType: selectContentType(item.type).primary,
      }
    })
    .filter(item => item.primaryType === 'Social Media')
    .sort((a, b) => {
      return b.createdAt - a.createdAt
    })

  const searcher = new FuzzySearch(
    sorted,
    ['name', 'title', 'owner', 'organization'],
    {
      sort: true,
    }
  )
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
    list = list.filter(item => (item.organizations || [])[0] === company)
  }

  const chunks = []
  const chunkSize = 25

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
    console.log('adding more')
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

  const handleChangeFilter = value => {
    setUserFilter(value)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <FabAdd Icon={NoteAdd} Dialog={DialogAbout} />
      <HeaderViews
        searchValue={searchValue}
        setSearchValue={handleUpdateSearch}
      />
      <Container maxWidth="xl">
        {/* <Grid container spacing={2} pt={2}> */}
        {/* <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Button
                  fullWidth
                  onClick={() => (window.location.hash = '#create')}
                  endIcon={<NoteAdd />}
                  variant="contained"
                  sx={{ height: '40px' }}
                >
                  Start a Story
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box width="100%">
                  <SearchBar
                    value={searchValue}
                    setValue={handleUpdateSearch}
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid> */}

        {/* <Grid item xs={12}> */}
        <Box width="100%" display="flex" mt={2}>
          <Box
            width="300px"
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
                      fullWidth
                      onClick={() => (window.location.hash = '#create')}
                      endIcon={<NoteAdd />}
                      variant="contained"
                      size="large"
                      sx={{ height: '56px' }}
                    >
                      Create Campaign
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <List disablePadding>
                      <ListItem disablePadding sx={{ pb: 1.5 }}>
                        <ListItemButton
                          selected={userFilter === user.id}
                          sx={{
                            minHeight: 48,
                            borderRadius: 1,
                          }}
                          onClick={() => handleChangeFilter(user.id)}
                        >
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                          <ListItemText primary="Your Campaigns" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton
                          selected={userFilter === null}
                          sx={{
                            minHeight: 48,
                            borderRadius: 1,
                          }}
                          onClick={() => handleChangeFilter(null)}
                        >
                          <ListItemIcon>
                            <Groups />
                          </ListItemIcon>
                          <ListItemText primary="All Campaigns" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Panel>
          </Box>
          <Box
            width="300px"
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
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ width: '100%' }}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell width="50%">Name</TableCell>
                              <TableCell width="15%">Company</TableCell>
                              <TableCell width="15%">Owner</TableCell>
                              <TableCell width="15%">Last Modified</TableCell>
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
                                      navigate('/social/' + item.id)
                                    } else {
                                      setSelectedId(item.id)
                                    }
                                  }}
                                  selected={selectedId === item.id}
                                >
                                  <TableCell
                                    width="55%"
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
                                    width="15%"
                                    sx={{
                                      maxWidth: 0,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {item.organization}
                                  </TableCell>
                                  <TableCell
                                    width="15%"
                                    sx={{
                                      maxWidth: 0,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {item.owner}
                                  </TableCell>
                                  <TableCell
                                    width="15%"
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
                </Grid>
              </div>
            </InfiniteScroll>
          </Box>
        </Box>
        {/* </Grid>
        </Grid> */}
      </Container>
      {/* </LayoutDrawer> */}
    </>
  )
}

export default ViewCampaigns
