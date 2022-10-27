import React from 'react'
// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'draft-js'
import { Box } from '@mui/material'
// import { use100vh } from 'hooks/use-100-vh'

const TextEditor = ({ editorState, onSetEditorState, saveStatus }) => {
  // console.log(editorState.getCurrentContent().getPlainText('\u0001'))

  const toolbarOptions = ['history', 'inline', 'list']

  const inlineOptions = ['bold', 'italic', 'underline']

  // const vh100 = use100vh()

  return (
    // <>
    // <Typography position="absolute" top="0" right="0" color="primary">
    //   {savingText}
    // </Typography>
    <Box position="relative" height="100%">
      <Editor
        toolbar={{
          options: toolbarOptions,
          inline: { options: inlineOptions },
          list: { inDropdown: true },
        }}
        editorState={editorState}
        onEditorStateChange={onSetEditorState}
        wrapperStyle={{
          // width: '100%',
          height: '100%',
          // overflow: 'hidden',
        }}
        toolbarStyle={{
          marginBottom: '0',
          // position: 'fixed',
          // zIndex: '100',
          width: '100%',
          borderRadius: '0',
          border: '0 0 5px 0',
        }}
        editorStyle={{
          height: 'calc(100% - 46px)',
          // marginTop: '46px',
          padding: '0 16px 32px 16px',
          // paddingBottom: '-16px',
          // marginTop: '-16px',
          // overflowY: 'scroll',
        }}
      />
    </Box>
    // </>
  )
}
export default TextEditor
