import * as Yup from 'yup'

export const allFields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Acme',
    type: 'text',
    validation: Yup.string()
      .required('Name is required')
      .max(50, 'Must be under 50 characters'),
    category: 'basic',
  },
  {
    name: 'website',
    label: 'Company Website',
    placeholder: 'https://acme.com',
    type: 'text',
    validation: Yup.string()
      .url(`Must be a valid URL, including http:// or https://`)
      .max(100, 'Must be under 100 characters'),
    category: 'basic',
  },
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
  {
    name: 'boilerplate',
    label: 'Boilerplate',
    placeHolder: 'Acme Inc. is a...',
    helpText: 'Company boilerplate for press releases',
    type: 'textarea',
    category: 'content',
  },
  {
    name: 'descriptor',
    label: 'Descriptor',
    placeHolder: 'a global manufacturer of gadgets and gizmos',
    helpText:
      'A short description of the company, for use at the start of press release. Should not include the name of the company.',
    type: 'text',
    category: 'content',
  },
  {
    name: 'team',
    label: 'Team',
    placeHolder: 'Team Awesome',
    helpText:
      'This is only shown internally, to help other teams reach out if they have an opportunity',
    type: 'text',
    validation: Yup.string().max(50, 'Must be under 50 characters'),
    // .required('Team is required'),
    category: 'settings',
  },
  {
    name: 'email',
    label: 'Contact Email',
    placeHolder: 'newsie@newsprint.com',
    type: 'email',
    helpText:
      'This is the email journalists will use to reach out to you. It is shown publicly.',
    validation: Yup.string().email('Must be a valid email address'),
    // .required('Email is required'),
    category: 'settings',
  },
]

export const getFields = category => {
  if (typeof category === 'object') {
    return allFields.filter(field => category.includes(field.category))
  } else {
    return allFields.filter(field => field.category === category)
  }
}
