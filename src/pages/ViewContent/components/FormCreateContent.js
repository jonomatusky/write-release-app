import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Collapse,
  TextField,
  Paper,
  Button,
} from '@mui/material'
import AutocompleteOrg from 'components/AutocompleteOrg'
import BarContentType from 'components/BarContentType'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import BarIndividuals from 'components/BarIndividuals'

const FormCreateContent = ({ content, onSubmit }) => {
  const [state, setState] = useState(content)

  const organizatonId = content.organizations[0]
  const { items: individuals } = useIndividualsStore()
  const quotedOptions = individuals.filter(
    item => item.organization === organizatonId
  )
  const mentionedOptions = quotedOptions.filter(
    item => !state?.individualsQuoted?.map(item2 => item2.id).includes(item.id)
  )

  // const handleSubmit = async () => {
  //   let values = {}
  //   values.organizations = [organizationId]
  //   values.type = contentTypeId
  //   values.individualsQuoted = individualsQuoted.map(item => item.id)
  //   values.individualsMentioned = individualsMentioned.map(item => item.id)
  //   values.titleInternal =
  //     organization.name +
  //     ' ' +
  //     contentType.secondary +
  //     ' Release - ' +
  //     new Date().toLocaleDateString('en-us', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //     })
  //   values.text = text
  //   try {
  //     const content = await create(values)
  //     navigate(`/content/${content.id}`)
  //   } catch (err) {}
  // }

  const handleSubmit = () => {
    onSubmit(state)
  }

  const handleChangeCompany = id => {
    setState({
      ...state,
      organizations: [id],
      individualsMentioned: [],
      individualsQuoted: [],
    })
  }

  const handleChangeQuotedIndividuals = individuals => {
    setState({
      ...state,
      individualsQuoted: individuals,
      individualsMentioned: [],
    })
  }

  const handleChangeMentionedIndividuals = individuals => {
    setState({ ...state, individualsMentioned: individuals })
  }

  const handleChangePrompt = e => {
    setState({ ...state, promptText: e.target.value })
  }

  const handleSetContentType = id => {
    setState({ ...state, type: id })
  }

  return (
    <Grid container justifyContent="center" mb={1} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body2" pb={1} pl={1}>
          <b>What type of press release is this?</b>
        </Typography>
        <Paper elevation={0}>
          <BarContentType typeId={state.type} setId={handleSetContentType} />
        </Paper>
      </Grid>
      <Collapse
        in={!!state.type}
        orientation="vertical"
        component={Grid}
        item
        xs={12}
      >
        <Typography variant="body2" pb={1} pl={1}>
          <b>Which company is this for?</b>
        </Typography>
        <Paper elevation={0}>
          <AutocompleteOrg
            orgId={state.organizations[0]}
            setId={handleChangeCompany}
            // error={error}
          />
          {/* <Typography fontSize="10pt" pt={0.5} pl={0.5}>
          Don't see the company in the list?{' '}
          <Link to="/companies#create">Create a new one</Link>{' '}
        </Typography> */}
        </Paper>
      </Collapse>
      <Collapse
        in={!!state.organizations[0]}
        orientation="vertical"
        component={Grid}
        item
        xs={12}
        pb={1}
      >
        <Typography variant="body2" pb={1} pl={1}>
          <b>Who should be quoted in this release?</b>
        </Typography>
        <Paper elevation={0}>
          <BarIndividuals
            values={state.individualsQuoted}
            setValues={handleChangeQuotedIndividuals}
            options={quotedOptions}
          />
          {/* <Typography fontSize="10pt" pt={0.5} pl={0.5}>
          Don't see them in the list?{' '}
          <Link to="/individuals#create">Create a new profile</Link>{' '}
        </Typography> */}
        </Paper>
      </Collapse>
      <Collapse
        in={!!state.organizations[0]}
        orientation="vertical"
        component={Grid}
        item
        xs={12}
      >
        <Typography variant="body2" pb={1} pl={1}>
          <b>Who else should be mentioned in this release?</b>
        </Typography>
        <Paper elevation={0}>
          <BarIndividuals
            values={state.individualsMentioned}
            setValues={handleChangeMentionedIndividuals}
            options={mentionedOptions}
          />
        </Paper>
      </Collapse>
      <Collapse
        in={!!state.organizations[0]}
        orientation="vertical"
        component={Grid}
        item
        xs={12}
      >
        <Typography variant="body2" pb={1} pl={1}>
          <b>What's this release about?</b>
        </Typography>
        <Paper elevation={0}>
          <TextField
            value={state.prompt}
            fullWidth
            onChange={handleChangePrompt}
            multiline
            rows={4}
          />
        </Paper>
      </Collapse>
      <Collapse
        in={!!state.organizations[0]}
        orientation="vertical"
        component={Grid}
        item
        xs={12}
      >
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Generate Content
        </Button>
      </Collapse>
    </Grid>
  )
}

export default FormCreateContent
