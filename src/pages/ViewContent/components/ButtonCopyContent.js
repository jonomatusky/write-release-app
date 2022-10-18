import React, { useState } from 'react'
import { ContentCopy } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useUserStore from 'hooks/store/use-user-store'
import { useNavigate } from 'react-router'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useAlertStore from 'hooks/store/use-alert-store'

const ButtonCopyContent = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { create, createStatus, select } = useContentStore()
  const { items: organizations } = useOrganizationsStore()
  const { item: user } = useUserStore()
  const navigate = useNavigate()
  const content = select(id)
  const organization = content.organizations[0]
  const { setMessage } = useAlertStore()

  const formFields = [
    {
      name: 'organization',
      label: 'Organization',
      type: 'auto',
      options: organizations || [],
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
    },
  ]

  const initialValues = {
    organization: organization,
    date: new Date(),
  }

  const handleSubmit = async values => {
    const newValues = {
      ...content,
      owner: user,
      organizations: [values.organization],
      date: values.date,
    }

    try {
      const newContent = await create(newValues)
      setIsOpen(false)
      navigate('/content/' + newContent.id)
      setMessage({ message: 'Content copied successfully' })
    } catch (err) {}
  }

  const { submit, control, reset } = useFormHelper({
    formFields,
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  return (
    <>
      {user.admin && (
        <>
          <LayoutDialogEdit
            open={isOpen}
            onClose={handleClose}
            title="Copy Content"
            onSave={submit}
            loading={createStatus === 'loading'}
          >
            <Form control={control} formFields={formFields} />
          </LayoutDialogEdit>
          <IconButton onClick={() => setIsOpen(true)}>
            <ContentCopy />
          </IconButton>
        </>
      )}
    </>
  )
}

export default ButtonCopyContent
