import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container,
  Grid,
  Paper,
  IconButton,
  Box,
  Button,
  Dialog,
} from '@mui/material'
import ResponsiveAvatar from 'components/ResponsiveAvatar'
import AvatarToEdit from './AvatarToEdit'
import useIndividualStore from 'hooks/store/individuals-store'

const BasicInfoDialog = () => {
  const [open, setOpen] = useState(false)
  const { update } = useIndividualStore()

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      placeHolder: 'Joe',
      type: 'text',
      validation: Yup.string()
        .required('First name is required')
        .max(50, 'Must be under 50 characters'),
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeHolder: 'Shmoe',
      type: 'text',
      validation: Yup.string()
        .required('Last name is required')
        .max(50, 'Must be under 50 characters'),
    },
    {
      name: 'title',
      label: 'Title',
      placeHolder: 'CEO',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'company',
      label: 'Company',
      placeHolder: 'ACME',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'companyUrl',
      label: 'Company Website',
      placeHolder: 'https://acme.com',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(100, 'Must be under 100 characters'),
    },
    {
      name: 'city',
      label: 'City',
      placeHolder: 'Metropolis',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'state',
      label: 'State',
      placeHolder: 'DE',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'country',
      label: 'Country',
      placeHolder: 'USA',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'team',
      label: 'Team',
      placeHolder: 'Team Awesome',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'email',
      label: 'Contact Email',
      placeHolder: 'client@gregoryfca.com',
      type: 'email',
      validation: Yup.string().email('Must be a valid email address'),
    },
    {
      name: 'bio',
      label: 'Bio',
      placeHolder: `Well! Here comes good ol' Joe Shmoe!`,
      type: 'textarea',
      validation: Yup.string().max(500, 'Must be under 500 characters'),
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
        { label: 'Other', value: 'other' },
      ],
    },
  ]

  const individual = {
    id: 1,
    isPrivate: false,
    hideQuotes: false,
    quotes: [
      {
        quote: `Given where valuations are, given where optimism is, given how fast and far we've come, it feels like the market is due for a little correction. There's a lot of good news out there but it really feels like it's all priced in,” says Spika.`,
        source: 'Bloomberg.com',
      },
    ],
    hideHighlights: false,
    highlights: [
      {
        url: 'https://www.bloomberg.com/news/articles/2018-04-24/joe-shmoe-says-he-has-a-plan-to-make-the-world-a-better-place',
        title: 'Joe Shmoe Says He Has A Plan To Make The World A Better Place',
        source: 'Bloomberg.com',
        image: 'https://picsum.photos/200/300',
      },
      {
        url: 'https://www.bloomberg.com/news/articles/2018-04-24/joe-shmoe-says-he-has-a-plan-to-make-the-world-a-better-place',
        title: 'Joe Shmoe Says He Has A Plan To Make The World A Better Place',
        source: 'Bloomberg.com',
        image: 'https://picsum.photos/200/300',
      },
    ],
    hideNews: false,
    trackerUrl: 'https://www.covertracker.com/',
    tabName: 'Coverage Tracker',
    mediaTrained: true,
    quickToBook: false,
    frequentSource: false,
    gender: 'male',
    tags: [
      {
        name: 'CRE',
      },
      {
        name: 'Investment',
      },
      {
        name: 'Management',
      },
    ],
  }

  const updateImage = imageFilepath => {
    update({ avatar: imageFilepath })
  }

  return (
    <>
      <Dialog open={open}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Box p={1}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <AvatarToEdit
                      avatar={individual.avatar}
                      updateImage={updateImage}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default BasicInfoDialog
