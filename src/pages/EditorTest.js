import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Box } from '@mui/material'

const EditorTest = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  return (
    <Box width="500px" height="600px">
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
    </Box>
  )
}

export default EditorTest
