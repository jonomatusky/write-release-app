import React from 'react'

import LayoutDialogEdit from 'layouts/LayoutDialogEdit'
import useContentStore from 'hooks/store/use-content-store'
import FormCreateContent from './FormCreateContent'

const DialogContentQuestions = ({ open, onClose, id }) => {
  const { update, select, updateStatus } = useContentStore()
  const content = select(id)

  const handleSave = values => {}

  const handleRemove = () => {}

  return (
    <LayoutDialogEdit
      title="Content Info"
      onSave={handleSave}
      onRemove={handleRemove}
      loading={updateStatus === 'loading'}
    >
      <FormCreateContent content={content} onSubmit={handleSave} />
    </LayoutDialogEdit>
  )
}

export default DialogContentQuestions
