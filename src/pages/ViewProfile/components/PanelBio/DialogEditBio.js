const DialogEditBio = ({ individual }) => {
  const formFields = [
    {
      name: 'bio',
      label: 'Bio',
      placeHolder: `Well! Here comes good ol' Joe Shmoe!`,
      type: 'textarea',
      validation: Yup.string().max(500, 'Must be under 500 characters'),
    },
  ]
}
