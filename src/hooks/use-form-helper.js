import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
// import { useEffect } from 'react'

const useFormHelper = ({ formFields, initialValues, onSubmit }) => {
  const validationSchema = Yup.object(
    formFields.reduce((p, c) => ({ ...p, [c.name]: c.validation }), {})
  )

  if (!initialValues) {
    initialValues = formFields.map(field => field.initialValue) || {}
  }

  let defaultValues = formFields.reduce(
    (p, c) => ({
      ...p,
      [c.name]: initialValues[c.name]
        ? initialValues[c.name]
        : c.type === 'boolean'
        ? false
        : '',
    }),
    {}
  )

  const {
    control,
    handleSubmit,
    setFocus,
    reset: handleReset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  })

  const reset = () => {
    handleReset(defaultValues)
  }

  // useEffect(() => {
  //   reset(defaultValues)
  // }, [initialValues, reset])

  const submit = handleSubmit(onSubmit)

  return { control, submit, setFocus, reset }
}

export default useFormHelper
