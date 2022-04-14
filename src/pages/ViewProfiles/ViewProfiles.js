import React, { useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Autocomplete,
  CircularProgress,
} from '@mui/material'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import IndividualCard from './components/IndividualCard'
import Panel from 'layouts/Panel'
import TextFielder from 'components/TextFielder'
import useTagsStore from 'hooks/store/use-tags-store'
import FuzzySearch from 'fuzzy-search'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonAddIndividual from './components/ButtonAddIndividual'

const ViewProfiles = () => {
  const { items: individuals } = useIndividualsStore()
  const { items: tags } = useTagsStore()

  const options = tags.map(tag => tag.name)

  const [search, setSearch] = useState('')
  const [values, setValues] = useState([])
  const [chunkCount, setChunkCount] = useState(1)
  const [inputValue, setInputValue] = useState('')

  const individualsSorted = [...individuals].sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  const searcher = new FuzzySearch(individualsSorted, ['name'])
  const result = searcher.search(search)

  let list = result

  if (values.length > 0) {
    list = result.filter(individual =>
      values.some(value => individual.tags.map(tag => tag.name).includes(value))
    )
  }

  const chunks = []
  const chunkSize = 12

  for (let i = 0; i < list.length; i += chunkSize) {
    const chunk = list.slice(i, i + chunkSize)
    chunks.push(chunk)
  }

  const individualsOnScreen = []

  chunks.forEach((chunk, index) => {
    if (index < chunkCount) {
      individualsOnScreen.push(...chunk)
    }
  })

  const addMoreIndividuals = () => {
    setChunkCount(chunkCount + 1)
  }

  return (
    <Container maxWidth="lg">
      <ButtonAddIndividual />
      <InfiniteScroll
        dataLength={individualsOnScreen.length}
        next={addMoreIndividuals}
        hasMore={individualsOnScreen.length < list.length}
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
              {individualsOnScreen.map(individual => (
                <Grid item xs={12} md={6} lg={4} key={individual.id}>
                  <IndividualCard id={individual.id} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </InfiniteScroll>
    </Container>
  )
}

export default ViewProfiles
