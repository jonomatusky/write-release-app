import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import useIndividualStore from 'hooks/store/use-individuals-store'
import LayoutDialogEdit from 'layouts/LayoutDialogEdit'

const DialogEditBio = ({ open, onClose }) => {
  const { update, select } = useIndividualStore()
  const { id } = useParams()
  const individual = select(id)

  let bio

  try {
    bio = EditorState.createWithContent(convertFromRaw(individual.bio))
  } catch {
    bio = EditorState.createEmpty()
  }

  const [editorState, setEditorState] = useState(bio)

  const handleEditorStateChange = editorState => {
    setEditorState(editorState)
  }

  const handleSubmit = async () => {
    try {
      const contentState = editorState.getCurrentContent()
      const raw = convertToRaw(contentState)
      const bioJSON = JSON.stringify(raw)
      await update({ id, bio: bioJSON })
      onClose()
    } catch (err) {}
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
