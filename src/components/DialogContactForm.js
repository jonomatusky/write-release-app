import React from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import * as Yup from 'yup'

import useInquiryStore from 'hooks/store/use-inquiries-store'
import useFormHelper from 'hooks/use-form-helper'
import useAlertStore from 'hooks/store/use-alert-store'
import Form from './Form/Form'

const DialogContactForm = ({ noScroll }) => {
  const { entity, entityType, clearEntity, create, createStatus } =
    useInquiryStore()

  const { name, firstName, email } = entity || {}

  const formFields = [
    {
      name: 'name',
      label: 'Your Name*',
      type: 'text',
      validation: Yup.string()
        .required('First name is required')
        .max(50, 'Must be under 100 characters'),
    },
    {
      name: 'email',
      label: 'Your Email*',
      type: 'email',
      validation: Yup.string()
        .required('Email is required')
        .email('Must be a valid email address'),
    },
    {
      name: 'phone',
      label: 'Phone (Optional)',
      type: 'tel',
      // validation: Yup.string().phone('Must be a valid phone number'),
      category: 'settings',
    },
    {
      name: 'company',
      label: 'Media Outlet (Optional)',
      type: 'text',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
    {
      name: 'message',
      label: 'Message (Optional)',
      type: 'textarea',
      validation: Yup.string().max(50, 'Must be under 50 characters'),
      category: 'basic',
    },
  ]

  const { setMessage } = useAlertStore()

  const handleSubmit = async values => {
    try {
      await create({ entityType, entity, ...values })
      clearEntity()
      setMessage({
        message: `Your message has been sent! We'll get back to you as soon as possible.`,
      })
    } catch (err) {}
  }

  const { control, submit, reset } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    clearEntity()
    reset()
  }

  return (
    <Dialog
      open={!!entity}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      transitionDuration={{ appear: 250, exit: 0 }}
    >
      <DialogTitle textAlign="center">
        <Box position="relative" maxHeight="100%">
          <Box position="absolute" zIndex="50" top="-3px" right="-10px">
            <IconButton onClick={handleClose}>
              <Close fontSize="medium" />
            </IconButton>
          </Box>
          {`Contact ` + name}
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box overflow={noScroll ? null : 'scroll'}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography>
                Submit this form to get in touch with {firstName}
              </Typography>
              <Typography>
                or send an email to{' '}
                <Link
                  href={'mailto:' + email + '?subject=Contacting ' + name}
                  target="_blank"
                >
                  {email}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Form
                formFields={formFields}
                submit={submit}
                control={control}
                spacing={2}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={submit}
          size="large"
          loading={createStatus === 'loading'}
          endIcon={<Send />}
        >
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default DialogContactForm
