import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const useFormHelper = ({ formFields, initialValues, onSubmit }) => {
  const validationSchema = Yup.object(
    formFields.reduce((p, c) => ({ ...p, [c.name]: c.validation }), {})
  )

  const { control, handleSubmit, setFocus } = useForm({
    defaultValues: formFields.reduce(
      (p, c) => ({ ...p, [c.name]: initialValues[c.name] || '' }),
      {}
    ),
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  })

  const submit = handleSubmit(onSubmit)

  return { control, submit, setFocus }
}

export default useFormHelper
