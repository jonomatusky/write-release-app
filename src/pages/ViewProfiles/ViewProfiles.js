import React, { useState } from 'react'
import { Container, Grid, Box, Autocomplete } from '@mui/material'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import IndividualCard from './components/IndividualCard'
import Panel from 'layouts/Panel'
import TextFielder from 'components/TextFielder'
import useTagsStore from 'hooks/store/use-tags-store'
import FuzzySearch from 'fuzzy-search'

const ViewProfiles = () => {
  const { items: individuals } = useIndividualsStore()
  const { items: tags } = useTagsStore()

  const options = tags.map(tag => tag.name)

  const [search, setSearch] = useState('')
  const [values, setValues] = useState([])
  const [inputValue, setInputValue] = useState('')

  const searcher = new FuzzySearch(individuals, [
    'name',
    'company',
    'title',
    'tags',
  ])
  const result = searcher.search(search)

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Panel>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFielder
                    label="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
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
              </Grid>
            </Box>
          </Panel>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={2}>
            {result.map(individual => (
              <Grid item xs={12} md={6} lg={4} key={individual.id}>
                <IndividualCard individual={individual} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ViewProfiles
