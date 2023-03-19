import React, { useState } from 'react'
import useUserStore from 'hooks/store/use-user-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import Form from 'components/Form/Form'
import useFormHelper from 'hooks/use-form-helper'
import * as Yup from 'yup'
import useRequest from 'hooks/use-request'
import useSession from 'hooks/use-session'

const AddAccountInfoDialog = () => {
  // this route wraps other internal routes and shows a pop up to collect additioanl user info
  const { request } = useRequest()
  const { item: user, update } = useUserStore()
  const { user: sessionUser } = useSession()

  const [isOpen, setIsOpen] = useState(!!user && !user.hasCompletedAccountInfo)

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      validation: Yup.string().required('Please enter a first name'),
      autoFocus: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      // validation: Yup.string().required('Please enter a last name'),
    },
    {
      name: 'company',
      label: 'Your Company',
      type: 'text',
      // validation: Yup.string().required('Please enter your company name'),
    },
    {
      name: 'title',
      label: 'Your Job Title',
      type: 'text',
      required: true,
      // validation: Yup.string().required('Please enter your job title'),
    },
  ]

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    title: user.title || '',
    company: user.company || '',
  }

  const handleSubmit = async values => {
    const { firstName, lastName, company, title } = values

    const data = {
      firstName,
      lastName,
      title,
      company,
      email: sessionUser.email,
      hasCompletedAccountInfo: true,
    }

    try {
      await update(data)
    } catch (err) {}

    request({
      quiet: true,
      url: '/leads',
      method: 'post',
      data,
    })

    setIsOpen(false)
  }

  const { control, submit } = useFormHelper({
    formFields,
    onSubmit: handleSubmit,
    initialValues,
  })

  return (
    <>
      <LayoutDialogEdit
        open={isOpen}
        onSave={submit}
        title="Tell us about yourself"
        disableBackdropClick
      >
        <Form control={control} formFields={formFields} submit={submit} />
      </LayoutDialogEdit>
    </>
  )
}

export default AddAccountInfoDialog
