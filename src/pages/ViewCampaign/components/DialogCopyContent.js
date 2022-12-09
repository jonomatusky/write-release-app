import React from 'react'
import useContentStore from 'hooks/store/use-content-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useUserStore from 'hooks/store/use-user-store'
import { useNavigate } from 'react-router'
import useFormHelper from 'hooks/use-form-helper'
import Form from 'components/Form/Form'
import useAlertStore from 'hooks/store/use-alert-store'
import useResourcesStore from 'hooks/store/use-resources-store'

const DialogCopyContent = ({ open: isOpen, onClose, id }) => {
  const { create, createStatus, select } = useContentStore()
  const { items: organizations } = useOrganizationsStore()
  const { items: resources, create: createResource } = useResourcesStore()
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
      draftUrl: null,
    }

    console.log(newValues)

    try {
      const newContent = await create(newValues)

      const newResources = resources.map(resource => {
        return {
          ...resource,
          owner: user,
          organizations: [values.organization],
          content: newContent.id,
        }
      })

      for (let resource of newResources) {
        await createResource(resource)
      }

      onClose()
      navigate('/stories/' + newContent.id)
      setMessage({ message: 'Content copied successfully' })
    } catch (err) {}
  }

  const { submit, control, reset } = useFormHelper({
    formFields,
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    onClose()
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
        </>
      )}
    </>
  )
}

export default DialogCopyContent
