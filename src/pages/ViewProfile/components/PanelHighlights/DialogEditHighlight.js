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
import DialogUploadVideo from 'components/DialogUploadVideo'

const DialogEditHighlight = ({ open, onClose, highlight }) => {
  const { update, updateStatus, remove } = useCoverageStore()

  const { mediaFile, videoFileUrl } = highlight

  const formFields = [
    {
      name: 'url',
      label: 'Link',
      placeholder: 'https://www...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(200, 'Must be under 200 characters'),
    },
    {
      name: 'title',
      label: 'Headline',
      placeholder: 'Great News Everyone!',
      type: 'text',
      validation: Yup.string().max(100, 'Must be under 100 characters'),
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
        .max(250, 'Must be under 250 characters'),
    },
    {
      name: 'mediaLink',
      label: 'Link to Video',
      placeholder: 'https://drive.google.com/...',
      type: 'text',
      validation: Yup.string()
        .url(`Must be a valid URL, including http:// or https://`)
        .max(250, 'Must be under 250 characters'),
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

  const handleSubmit = async values => {
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
            <Form formFields={formFields} control={control} />
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
        </Grid>
      </LayoutDialogEdit>
    </>
  )
}

export default DialogEditHighlight
