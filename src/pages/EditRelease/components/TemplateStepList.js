import React, { useState } from 'react'
import {
  Box,
  Typography,
  TableContainer,
  TableRow,
  TableBody,
  Table,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import SearchBar from 'components/SearchBar'
import FuzzySearch from 'fuzzy-search'
import GridButtons from './GridButtons'

const TemplateStepList = ({
  label,
  options,
  primaryField,
  searchFields,
  onAnswer,
  value,
  onNext,
  onBack,
  name,
}) => {
  const [search, setSearch] = useState('')

  const searcher = new FuzzySearch(options, searchFields || primaryField, {
    sort: true,
  })
  const result = searcher.search(search)

  const handleSelect = id => {
    onAnswer({ [name]: id })
    onNext()
  }

  return (
    <>
      {options && options.length !== 0 && (
        <Box
          height="700px"
          maxHeight="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="space-between"
        >
          <Box mt={6} mb={2}>
            <Typography variant="h5" component="h1" gutterBottom>
              {label}
            </Typography>
          </Box>
          <Box>
            <SearchBar value={search} setValue={setSearch} fullWidth />
          </Box>
          <Box
            flexGrow={1}
            mt={3}
            mb={2}
            minHeight="0"
            overflow="scroll"
            sx={{
              '::-webkit-scrollbar': {
                WebkitAppearance: 'none',
                width: '7px',
                height: '0px',
              },
              '::-webkit-scrollbar-thumb': {
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                boxShadow: '0 0 1px rgba(255, 255, 255, .5)',
              },
            }}
            // borderColor="grey.400"
            // backgroundColor="grey.300"
            // borderRadius={2}
          >
            {/* <Paper height="100%"> */}
            <TableContainer>
              <Table
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: 'none',
                  },
                }}
              >
                <TableBody>
                  {result.map(item => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      // selected={item.id === selected}
                      sx={{ cursor: 'pointer' }}
                      hover
                      selected={item.id === value}
                    >
                      <TableCell
                        sx={{
                          pt: 1.5,
                          pb: 1.5,
                        }}
                      >
                        {/* <Button>test</Button> */}
                        <Typography
                          fontWeight="bold"
                          fontSize="1.2rem"
                          textAlign="left"
                          whiteSpace="pre-wrap"
                        >
                          {(!!item.emoji ? item.emoji + '  ' : '') +
                            item[primaryField]}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <Grid container spacing={2}>
              {result.map(item => (
                <Grid item xs={12} key={item.id}>
                  <Button
                    fullWidth
                    size="large"
                    onClick={() => onAnswer(item)}

                    // variant="contained"
                    // color="secondary"
                  >
                    <Box width="100%" pl={4}>
                      <Typography
                        fontWeight="bold"
                        fontSize="1.2rem"
                        textAlign="left"
                      >
                        {item.secondary}
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
              ))} */}
            {/* </Grid> */}

            {/* </Paper> */}
          </Box>
          <Box>
            <GridButtons onNext={onNext} onBack={onBack} disabled={!value} />
          </Box>
        </Box>
      )}
    </>
  )
}

export default TemplateStepList
