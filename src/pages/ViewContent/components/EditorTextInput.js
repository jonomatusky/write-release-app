import React, { useCallback, useEffect, useState } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'

const EditorTextInput = ({ editorState }) => {
  const [editorState, setEditorState] = useState(
    !!text
      ? EditorState.createWithContent(ContentState.createFromText(text))
      : EditorState.createEmpty()
  )

  const handleChange = state => {
    setEditorState(state)
    onChange(state)
  }

  const handlePush = useCallback(
    contentState => {
      setEditorState(EditorState.push(editorState, contentState))
    },
    [editorState]
  )

  useEffect(() => {
    if (!!text) {
      handlePush(ContentState.createFromText(text))
    }
  }, [text, handlePush])

  return (
    <Editor
      editorState={editorState}
      onChange={handleChange}
      placeholder="Title"
    />
  )
}

export default EditorTextInput
