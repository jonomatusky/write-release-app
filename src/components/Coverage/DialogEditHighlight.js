import React, { useState } from 'react'
import * as Yup from 'yup'
import { Button, Grid } from '@mui/material'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useCoverageStore from 'hooks/store/use-coverage-store'
import ReactPlayer from 'react-player'
import { Box } from '@mui/system'
import { Delete, Upload } from '@mui/icons-material'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { LoadingButton } from '@mui/lab'
import DialogUploadVideo from 'components/Coverage/DialogUploadVideo'
import AutocompleteOrgs from 'components/AutocompleteOrgs'
import AutocompleteIndividuals from 'components/AutocompleteIndividuals'

const DialogEditHighlight = ({ open, onClose, highlight }) => {
  const { update, updateStatus, remove } = useCoverageStore()

  const { mediaFile, videoFileUrl, organizations, individuals } = highlight

  const formFields = [
    {
      name: 'url',
      label: 'Link',
      placeholder: 'https://www...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(500, 'Must be under 500 characters'),
    },
    {
      name: 'title',
      label: 'Headline',
      placeholder: 'Great News Everyone!',
      type: 'text',
      validation: Yup.string().max(200, 'Must be under 200 characters'),
    },
    {
      name: 'outlet',
      label: 'Outlet',
      placeholder: 'News Site',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
    },
    {
      name: 'date',
      label: 'Publication Date',
      placeholder: new Date(),
      type: 'date',
      validation: Yup.date()
        .nullable()
        .transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
    },
    {
      name: 'image',
      label: 'Link to Image',
      placeholder: 'https://drive.google.com/...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(500, 'Must be under 500 characters'),
    },
    {
      name: 'mediaLink',
      label: 'Link to Video',
      placeholder: 'https://drive.google.com/...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(500, 'Must be under 500 characters'),
    },
  ]

  const storage = getStorage()

  const [removeStatus, setRemoveStatus] = useState('idle')

  const handleRemoveVideo = async () => {
    setRemoveStatus('loading')
    update({ id: highlight.id, mediaFile: null })
    const videoRef = ref(storage, mediaFile)
    await deleteObject(videoRef)
    setRemoveStatus('idle')
  }

  const handleDelete = async () => {
    if (!!mediaFile) {
      const videoRef = ref(storage, mediaFile)
      await deleteObject(videoRef)
    }
    await remove(highlight.id)
  }

  const [highlightOrgs, setHighlightOrgs] = useState(organizations)
  const [highlightIndividuals, setHighlightIndividuals] = useState(individuals)

  const handleSubmit = async values => {
    values.organizations = highlightOrgs
    values.individuals = highlightIndividuals
    try {
      await update({ id: highlight.id, ...values })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    initialValues: highlight,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    setHighlightOrgs(organizations)
    setHighlightIndividuals(individuals)
    onClose()
    reset()
  }

  const [videoUploadDialogOpen, setVideoUploadDialogOpen] = useState(false)

  const handleVideoUploadDialogClose = () => {
    setVideoUploadDialogOpen(false)
  }

  const handleSubmitVideoFile = filepath => {
    update({
      id: highlight.id,
      mediaFile: filepath,
    })
  }

  return (
    <>
      <DialogUploadVideo
        open={videoUploadDialogOpen}
        onClose={handleVideoUploadDialogClose}
        submit={handleSubmitVideoFile}
      />
      <LayoutDialogEdit
        title="Edit Highlight"
        open={open}
        onClose={handleClose}
        onSave={submit}
        onRemove={handleDelete}
        loading={updateStatus === 'loading'}
      >
        <Grid container spacing={2} justifyContent="center" pb={2} pt={2}>
          <Grid item xs={12}>
            <Form formFields={formFields} control={control} submit={submit} />
          </Grid>

          <Grid item xs={12}>
            {videoFileUrl ? (
              <Box display="flex" alignItems="center">
                <ReactPlayer
                  url={videoFileUrl}
                  controls={false}
                  playing={false}
                  width="150px"
                  height="100px"
                />
                <Box pl={1}>
                  <LoadingButton
                    color="primary"
                    onClick={handleRemoveVideo}
                    startIcon={<Delete />}
                    loading={removeStatus === 'loading'}
                  >
                    Remove
                  </LoadingButton>
                </Box>
              </Box>
            ) : (
              <Button
                fullWidth
                endIcon={<Upload />}
                variant="outlined"
                size="large"
                onClick={() => setVideoUploadDialogOpen(true)}
              >
                Upload Video File
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <AutocompleteOrgs ids={highlightOrgs} setIds={setHighlightOrgs} />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteIndividuals
              ids={highlightIndividuals}
              setIds={setHighlightIndividuals}
            />
          </Grid>
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogEditHighlight
