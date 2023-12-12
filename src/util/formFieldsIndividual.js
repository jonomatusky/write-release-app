import * as Yup from 'yup'

export const allFields = [
  {
    name: 'firstName',
    label: 'First Name*',
    placeholder: 'Joe',
    type: 'text',
    validation: Yup.string()
      .required('First name is required')
      .max(50, 'Must be under 50 characters'),
    category: 'basic',
  },
  {
    name: 'lastName',
    label: 'Last Name*',
    placeholder: 'Shmoe',
    type: 'text',
    validation: Yup.string()
      .required('Last name is required')
      .max(50, 'Must be under 50 characters'),
    category: 'basic',
  },
  // {
  //   name: 'organization',
  //   label: 'Company',
  //   type: 'select',
  //   category: 'basic',
  // },
  {
    name: 'title',
    label: 'Title',
    placeholder: 'CEO',
    type: 'text',
    validation: Yup.string().max(100, 'Must be under 100 characters'),
    category: 'basic',
  },
  // {
  //   name: 'company',
  //   label: 'Company',
  //   placeholder: 'ACME',
  //   type: 'text',
  //   validation: Yup.string().max(50, 'Must be under 50 characters'),
  //   category: 'basic',
  // },
  // {
  //   name: 'companyUrl',
  //   label: 'Company Website',
  //   placeholder: 'https://acme.com',
  //   type: 'text',
  //   validation: Yup.string()
  //     .url(`Must be a valid URL, including http:// or https://`)
  //     .max(100, 'Must be under 100 characters'),
  //   category: 'basic',
  // },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Metropolis',
    type: 'text',
    validation: Yup.string().max(50, 'Must be under 50 characters'),
    category: 'basic',
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'DE',
    type: 'text',
    validation: Yup.string().max(50, 'Must be under 50 characters'),
    category: 'basic',
  },
  {
    name: 'country',
    label: 'Country',
    placeholder: 'USA',
    type: 'text',
    validation: Yup.string().max(50, 'Must be under 50 characters'),
    category: 'basic',
  },
  // {
  //   name: 'gender',
  //   label: 'Gender',
  //   type: 'select',
  //   options: [
  //     { label: 'Female', value: 'female' },
  //     { label: 'Male', value: 'male' },
  //     { label: 'Other', value: 'other' },
  //   ],
  // },
  // {
  //   name: 'team',
  //   label: 'Team',
  //   placeHolder: 'Team Awesome',
  //   helpText:
  //     'This is only shown internally, to help other teams reach out if they have an opportunity',
  //   type: 'text',
  //   validation: Yup.string()
  //     .max(50, 'Must be under 50 characters')
  //     .required('Team is required'),
  //   category: 'settings',
  // },
  {
    name: 'email',
    label: 'Contact Email',
    placeHolder: 'newsie@newsprint.com',
    type: 'email',
    helpText:
      'This is the email journalists will use to reach out to you. It is shown publicly.',
    validation: Yup.string().email('Must be a valid email address'),
    category: 'settings',
  },
]

// the second 'options' input is optional and of the form { FIELDNAME: [...OPTIONS]}
export const getFields = (category, options) => {
  const fields = allFields.filter(field => field.category === category)
  const optionKeys = Object.keys(options || {})
  optionKeys.forEach(optionKey => {
    fields[optionKey].options = options[optionKey]
  })

  return fields
}
