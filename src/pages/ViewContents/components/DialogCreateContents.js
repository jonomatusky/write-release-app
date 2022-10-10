import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Box } from '@mui/material'
import * as Yup from 'yup'

import useOrganizationsStore from 'hooks/store/use-organizations-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import { NoteAdd } from '@mui/icons-material'
import useContentStore from 'hooks/store/use-content-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useUserStore from 'hooks/store/use-user-store'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'

const DialogCreateContent = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { create, createStatus } = useContentStore()
  const { items: contentTypes, select: selectContentType } =
    useContentTypesStore()
  const { items: organizations, select: selectOrganization } =
    useOrganizationsStore()
  const { item: user } = useUserStore()

  const handleSubmit = async values => {
    values.owner = user.id
    let date = values.date ? new Date(values.date) : new Date()

    const organization = selectOrganization(values.organization)
    const contentType = selectContentType(values.contentType)

    values.titleInternal =
      organization +
      ' ' +
      contentType +
      ' Release - ' +
      date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    try {
      const content = await create(values)
      window.location.hash = ''
      navigate(`/content/${content.id}`)
    } catch (err) {}
    console.log(values)
  }

  const handleClose = () => {
    onClose()
  }

  // const audienceOptions = [
  //   'Customers',
  //   'Investors',
  //   'Employees',
  //   'Media',
  //   'Other',
  // ]

  // const toneOptions = [
  //   'Journalistic',
  //   'Persuasive',
  //   'Witty',
  //   'Informative',
  //   'Enthusiastic',
  //   'Entertaining',
  //   'Other',
  // ]

  const formFields = [
    {
      label: 'What type of press are you writing?',
      name: 'contentType',
      options:
        contentTypes.map(contentType => ({
          ...contentType,
          name: contentType.secondary,
        })) || [],
      type: 'auto',
      validation: Yup.string().required('Type is required'),
    },
    {
      label: 'Which company is this for?',
      name: 'organization',
      options: organizations || [],
      type: 'auto',
      validation: Yup.string().required('Company is required'),
    },
    {
      label: 'When is this release going out?',
      name: 'date',
      type: 'date',
    },
    // {
    //   label: `What's the target audience for this release?`,
    //   name: 'audiences',
    //   options: audienceOptions,
    //   type: 'auto',
    // },
    // {
    //   label: `What's the tone of this release?`,
    //   name: 'tone',
    //   options: toneOptions,
    //   type: 'auto',
    // },
  ]

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
    initialValues: {
      tone: 'Journalistic',
    },
  })

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
      onSave={submit}
      loading={createStatus === 'loading'}
      label="Create"
    >
      <Grid container justifyContent="center" spacing={3} pb={2} pt={1}>
        <Grid item xs={12}>
          <Form formFields={formFields} submit={submit} control={control} />
        </Grid>
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
