import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Grid,
  Box,
  Typography,
  Collapse,
  // TextField
} from '@mui/material'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import { NoteAdd } from '@mui/icons-material'
import AutocompleteOrg from 'components/AutocompleteOrg'
import BarContentType from 'components/BarContentType'
import useContentStore from 'hooks/store/use-content-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
// import useIndividualsStore from 'hooks/store/use-individuals-store'
import Link from 'components/Link'
import useUserStore from 'hooks/store/use-user-store'
// import BarIndividuals from 'components/BarIndividuals'

const DialogCreateContent = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { create, createStatus } = useContentStore()
  const { select: selectContentType } = useContentTypesStore()
  const { select: selectOrganization } = useOrganizationsStore()
  const { item: user } = useUserStore()
  const [organizationId, setOrganizationId] = useState('')
  const [contentTypeId, setContentTypeId] = useState('')
  // const [individualsQuoted, setIndividualsQuoted] = useState([])
  // const [individualsMentioned, setIndividualsMentioned] = useState([])
  // const [text, setText] = useState('')

  const contentType = selectContentType(contentTypeId)
  const organization = selectOrganization(organizationId)
  // const { items } = useIndividualsStore()
  // const individuals = items
  //   .filter(item => item.organization === organizationId)
  //   .filter(item => !individualsQuoted.map(item2 => item2.id).includes(item.id))

  const handleSubmit = async () => {
    let values = {}
    values.organizations = [organizationId]
    values.type = contentTypeId
    values.owner = user.id
    // values.individualsQuoted = individualsQuoted.map(item => item.id)
    // values.individualsMentioned = individualsMentioned.map(item => item.id)
    values.titleInternal =
      organization.name +
      ' ' +
      contentType.secondary +
      ' Release - ' +
      new Date().toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    // values.text = text
    try {
      const content = await create(values)
      window.location.hash = ''
      navigate(`/content/${content.id}`)
    } catch (err) {}
    // console.log(values)
  }

  const handleClose = () => {
    onClose()
  }

  const handleChangeCompany = id => {
    setOrganizationId(id)
    // setIndividualsMentioned([])
    // setIndividualsQuoted([])
    // if (id === '') {
    //   setIndividualsMentioned([])
    //   setIndividualsQuoted([])
    // }
  }

  // const handleChangeQuotedIndividual = individuals => {
  //   setIndividualsQuoted(individuals)
  //   setIndividualsMentioned([])
  // }

  return (
    <LayoutDialogEdit
      title={
        <Box display="flex" alignItems="center" justifyContent="center">
          <NoteAdd />
          <Box pl={1}>Create Press Release</Box>
        </Box>
      }
      open={open}
      onClose={handleClose}
      onSave={handleSubmit}
      loading={createStatus === 'loading'}
    >
      <Grid container justifyContent="center" pb={2} mt={1} mb={1}>
        <Grid item xs={12} pb={3}>
          <BarContentType
            id={contentTypeId}
            setId={setContentTypeId}
            label="What type of press release are you writing?"
          />
        </Grid>
        <Collapse
          in={!!contentTypeId}
          orientation="vertical"
          component={Grid}
          item
          xs={12}
          pb={1}
        >
          <AutocompleteOrg
            id={organizationId}
            setId={handleChangeCompany}
            label="Which company is this for?"
            // error={error}
          />
          <Typography fontSize="10pt" pt={0.5} pl={0.5}>
            Don't see the company in the list?{' '}
            <Link to="/companies#create">Create a new one</Link>{' '}
          </Typography>
        </Collapse>
        {/* <Collapse
          in={!!organizationId}
          orientation="vertical"
          component={Grid}
          item
          xs={12}
          pb={1}
        >
          <BarIndividuals
            label="Who should be quoted in this release?"
            values={individualsQuoted}
            setValues={handleChangeQuotedIndividual}
            orgId={organizationId}
          />
          <Typography fontSize="10pt" pt={0.5} pl={0.5}>
            Don't see them in the list?{' '}
            <Link to="/profiles#create">Create a new profile</Link>{' '}
          </Typography>
        </Collapse> */}
        {/* <Collapse
          in={!!organizationId}
          orientation="vertical"
          component={Grid}
          item
          xs={12}
          pb={3}
        >
          <BarIndividuals
            label="Who else should be mentioned in this release?"
            values={individualsMentioned}
            setValues={setIndividualsMentioned}
            orgId={organizationId}
            options={individuals}
          />
        </Collapse> */}
        {/* <Collapse
          in={!!organizationId}
          orientation="vertical"
          component={Grid}
          item
          xs={12}
        >
          <TextField
            label="What's this release about?"
            value={text}
            fullWidth
            onChange={e => setText(e.target.value)}
            multiline
            rows={4}
          />
        </Collapse> */}
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogCreateContent
