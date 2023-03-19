import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  Grid,
  CircularProgress,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import FuzzySearch from 'fuzzy-search'
import InfiniteScroll from 'react-infinite-scroll-component'
import usePageTitle from 'hooks/use-page-title'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useContentStore from 'hooks/store/use-content-store'
import useFetchContent from 'hooks/use-fetch-content'
import useUserStore from 'hooks/store/use-user-store'
import HeaderViews from 'components/Header'
import Loading from 'pages/Loading/Loading'

const ViewReleases = () => {
  const { items } = useContentStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)
  const { item: user } = useUserStore()

  const search = searchParams.get('search') || ''

  const [searchValue, setSearchValue] = useState(search)

  usePageTitle()
  useFetchContent()

  const [chunkCount, setChunkCount] = useState(1)

  const viewAll = searchParams.get('view') === 'all'

  const filtered = [...items].filter(item =>
    !user.id ? false : viewAll ? true : item.owner === user.id
  )

  const sorted = filtered.sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  const searcher = new FuzzySearch(sorted, ['name', 'title'], {
    sort: true,
  })
  const result = searcher.search(search)

  let list = result

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
    setChunkCount(chunkCount + 1)
  }

  const handleUpdateSearch = value => {
    setSearchValue(value)
  }

  useEffect(() => {
    const sv = searchValue

    const timeout = setTimeout(() => {
      const s = searchParams.get('search') || ''

      if (sv === searchValue && sv !== s) {
        let params = !!sv && sv !== '' ? [['search', sv]] : []
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

  return (
    <>
      <HeaderViews
        searchValue={searchValue}
        setSearchValue={handleUpdateSearch}
        showSearch
        showCreateButton
        showAvatar
      />
      {!user.id && <Loading />}
      {!!user.id && (
        <Container maxWidth="md">
          <Box width="100%" display="flex" mt={2}>
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
                                <TableCell width="75%">Name</TableCell>
                                <TableCell width="25%" align="right">
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
                                        navigate('/releases/' + item.id)
                                      } else {
                                        setSelectedId(item.id)
                                      }
                                    }}
                                    selected={selectedId === item.id}
                                  >
                                    <TableCell
                                      width="75%"
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
                                        'New Press Release'}
                                    </TableCell>

                                    <TableCell
                                      width="25%"
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
                  </Grid>
                </div>
              </InfiniteScroll>
            </Box>
          </Box>
          {/* </Grid>
        </Grid> */}
        </Container>
      )}
      {/* </LayoutDrawer> */}
    </>
  )
}

export default ViewReleases
