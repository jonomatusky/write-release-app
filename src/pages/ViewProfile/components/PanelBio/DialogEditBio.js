import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import useIndividualStore from 'hooks/store/individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'

const DialogEditBio = ({ open, onClose }) => {
  // const formFields = [
  //   {
  //     name: 'bio',
  //     label: 'Bio',
  //     placeHolder: `Well! Here comes good ol' Joe Shmoe!`,
  //     type: 'textarea',
  //     validation: Yup.string().max(500, 'Must be under 500 characters'),
  //   },
  // ]

  // open = true

  const { update, select } = useIndividualStore()
  const { id } = useParams()
  const individual = select(id)

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(individual.bio))
  )

  const handleEditorStateChange = editorState => {
    setEditorState(editorState)
  }

  const handleSubmit = async () => {
    update({ id, bio: editorState })
    onClose()
  }

  const toolbarOptions = ['inline', 'list', 'history']

  const inlineOptions = ['bold', 'italic', 'underline']

  return (
    <LayoutDialogEdit
      title="Edit Bio"
      open={open}
      onClose={onClose}
      onSave={handleSubmit}
    >
      <Grid container spacing={2} justifyContent="center" pb={2}>
        <Grid item xs={12}>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            toolbar={{
              options: toolbarOptions,
              inline: { options: inlineOptions },
            }}
          />
        </Grid>
      </Grid>
    </LayoutDialogEdit>
  )
}

export default DialogEditBio
