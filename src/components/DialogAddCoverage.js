import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Grid, Button, Slide, Box } from '@mui/material'
import { ArrowBackIosNew, Link, Upload, VideoFile } from '@mui/icons-material'

import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import { useRequest } from 'hooks/use-request'
import useCoverageStore from 'hooks/store/use-coverage-store'
import DialogUploadVideo from './DialogUploadVideo'

const DialogAddHighlight = ({ index, open, onClose }) => {
  const [selection, setSelection] = useState(null)
  const { update, select } = useIndividualStore()
  const { create, createStatus } = useCoverageStore()
  const { request, status } = useRequest()
  const { pid } = useParams()
  const individual = select(pid)

  const highlights = individual.highlights || []

  const [initialValues, setIntialValues] = useState({ url: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (open) {
      setIsSubmitted(false)
    }
  }, [open])

  const formFields = [
    {
      name: 'url',
      label: 'Link to ' + selection,
      placeholder: 'https://www...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(200, 'Must be under 200 characters'),
    },
  ]

  const handleSubmit = async values => {
    const { url } = values

    let siteInfo

    try {
      const { data } = await request({
        url: '/site-info',
        method: 'POST',
        data: { urls: [url] },
      })
      siteInfo = (data || [])[0]
    } catch (err) {
      console.log(err)
    }

    if (selection === 'video') {
      siteInfo.mediaLink = url
    }

    let coverageItem

    try {
      coverageItem = await create({ ...siteInfo, individuals: [individual.id] })
    } catch (err) {
      console.log(err)
    }

    if (index && coverageItem) {
      try {
        const newHighlights = [...highlights]
        newHighlights[index] = coverageItem.id

        await update({ id: pid, highlights: newHighlights })
      } catch (err) {
        console.log(err)
      }
    }

    setIntialValues({ url: '' })
    setSelection(null)
    onClose()
    setIsSubmitted(true)
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    reset()
    setSelection(null)
    onClose()
  }

  const handleSubmitVideoFile = filepath => {
    create({
      individuals: [individual.id],
      mediaFile: filepath,
      date: new Date(),
    })
    handleClose()
  }

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  useEffect(() => {
    if (isSubmitted && !open) {
      reset()
      setIsSubmitted(false)
    }
  }, [isSubmitted, open, reset])

  return (
    <>
      <DialogUploadVideo
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        submit={handleSubmitVideoFile}
      />
      <LayoutDialogEdit
        title="Add Coverage"
        open={open}
        onClose={handleClose}
        onSave={submit}
        loading={status === 'loading' || createStatus === 'loading'}
      >
        <Box
          width="100%"
          display="flex"
          overflow="hidden"
          flexWrap="none"
          minHeight="175px"
        >
          <Slide
            direction={'right'}
            in={!selection}
            mountOnEnter
            unmountOnExit
            appear={false}
          >
            <Grid container spacing={2} justifyContent="center" pb={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  endIcon={<Link />}
                  variant="contained"
                  size="large"
                  onClick={() => setSelection('article')}
                >
                  Add Article from Link
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  endIcon={<VideoFile />}
                  variant="contained"
                  size="large"
                  onClick={() => setSelection('video')}
                >
                  Add Video from Link
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  endIcon={<Upload />}
                  variant="contained"
                  size="large"
                  onClick={() => setUploadDialogOpen(true)}
                >
                  Upload File
                </Button>
              </Grid>
            </Grid>
          </Slide>
          {(selection === 'article' || selection === 'video') && (
            <Slide
              direction="left"
              in={selection === 'article' || selection === 'video'}
              mountOnEnter
              unmountOnExit
            >
              <Grid container spacing={2} justifyContent="center" pb={2}>
                <Grid item xs={12}>
                  <Button
                    startIcon={<ArrowBackIosNew />}
                    onClick={() => setSelection(null)}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Form formFields={formFields} control={control} />
                </Grid>
              </Grid>
            </Slide>
          )}
        </Box>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogAddHighlight
