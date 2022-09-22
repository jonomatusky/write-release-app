import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Grid,
  Box,
  Button,
  Chip,
  Typography,
  TextField,
  Toolbar,
} from '@mui/material'
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  SelectionState,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import BasicInfo from './components/PanelBasicsIndividual'
import PanelTags from 'components/PanelTags'
import Loading from 'pages/Loading/Loading'
import NotFound from 'pages/NotFound/NotFound'
import ButtonContact from 'components/ButtonContact'
import useHistoryStore from 'hooks/store/use-history-store'
import { ArrowBackIos, Settings } from '@mui/icons-material'
import ButtonEditPanel from 'components/ButtonEditPanel'
import DialogEditSettings from './components/DialogEditSettings'
import PanelBullets from 'components/PanelBullets/PanelBullets'
import useSession from 'hooks/use-session'
import useFetchCoverage from 'hooks/use-fetch-coverage'
import PanelCoverage from 'components/PanelCoverage'
import usePageTitle from 'hooks/use-page-title'
import FabContact from 'components/FabContact'
import useContentStore from 'hooks/store/use-content-store'
import useFetchContent from 'hooks/use-fetch-content'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ContentName from './components/ContentName'
import FormCreateContent from './components/FormCreateContent'
import TextEditor from './components/TextEditor'
import { use100vh } from 'hooks/use-100-vh'
import useRequest from 'hooks/use-request'

const ViewContent = () => {
  const { id } = useParams()
  const { user } = useSession()
  const { select, update, fetchStatus, updateStatus } = useContentStore()
  const content = select(id)
  const { titleInternal } = content
  const [saveStatus, setSaveStatus] = useState('saved')

  const { history } = useHistoryStore()

  const { coverage } = useFetchCoverage({
    object: 'individual',
    id,
  })

  const [editorState, setEditorState] = useState(
    content.text
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(content.text)))
      : EditorState.createEmpty()
  )

  useEffect(() => {
    if (!!content.text) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content.text)))
      )
    }
  }, [content.text])

  const navigate = useNavigate()

  usePageTitle((!!titleInternal ? titleInternal + ' | ' : '') + 'SourceOn')

  const handleUpdate = async values => {
    try {
      await update({ id, ...values })
    } catch (err) {
      console.log(err)
    }
  }

  useFetchContent()

  const toolbarOptions = ['history', 'inline', 'list']

  const inlineOptions = ['bold', 'italic', 'underline']

  const [name, setName] = useState(titleInternal || '')

  useEffect(() => {
    setName(titleInternal)
  }, [titleInternal])

  const handleUpdateName = () => {
    update({ id, titleInternal: name })
  }

  const handleUpdateText = async text => {
    setSaveStatus('saving')
    await update({ id, text })
    setSaveStatus('saved')
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (saveStatus === 'unsaved') {
        try {
          await handleUpdateText(
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))
          )
          setSaveStatus('saved')
        } catch (err) {
          setSaveStatus('unsaved')
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  })

  const vh100 = use100vh()

  useEffect(() => {
    document.body.style.height = vh100
  }, [vh100])

  const { request } = useRequest()

  const handleAppend = async values => {
    console.log('appending')

    const { _id, ...newValues } = values

    let text

    try {
      await update({ id, ...newValues })
      const res = await request({
        url: `/generator`,
        method: 'POST',
        data: {
          contentId: id,
        },
      })
      text = res.data
    } catch (err) {
      console.log(err)
    }

    // get current editor state
    const currentContent = editorState.getCurrentContent()

    // create new selection state where focus is at the end
    // const blockMap = currentContent.getBlockMap()

    // console.log(blockMap)
    // const key = blockMap.last().getKey()
    // const length = blockMap.last().getLength()
    // const selection = new SelectionState({
    //   anchorKey: key,
    //   anchorOffset: length,
    //   focusKey: key,
    //   focusOffset: length,
    // })

    const editorStateWithFocusAtEnd = EditorState.moveFocusToEnd(editorState)
    const selection = editorStateWithFocusAtEnd.getSelection()

    const blockContent = currentContent.getLastBlock().getText()

    const textWithInsert = Modifier.insertText(
      currentContent,
      selection,
      text,
      null
    )

    let newContent

    if (blockContent !== '') {
      newContent = Modifier.splitBlock(textWithInsert, selection)
    } else {
      newContent = textWithInsert
    }

    //insert text at the selection created above
    const editorWithInsert = EditorState.push(
      editorState,
      newContent,
      'split-block'
    )

    //also focuses cursor at the end of the editor
    const newEditorState = EditorState.moveSelectionToEnd(editorWithInsert)

    setSaveStatus('unsaved')
    setEditorState(newEditorState)
  }

  const handleSetEditorState = editorState => {
    setSaveStatus('unsaved')
    setEditorState(editorState)
  }

  return (
    <>
      {(fetchStatus === 'loading' || fetchStatus === 'idle') && <Loading />}
      {fetchStatus === 'failed' && <NotFound />}
      {fetchStatus === 'succeeded' && (
        <>
          {/* {history.length > 1 && !!user && (
            <Box
              color="primary"
              position="absolute"
              left={12}
              zIndex="100"
              variant="extended"
              pt={2}
            >
              <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIos />}
                color="secondary"
              >
                Back
              </Button>
            </Box>
          )} */}

          <Box display="flex">
            <Box
              height={vh100}
              width="41.66666666667%"
              p={3}
              pl={4}
              pt={0}
              overflow="scroll"
            >
              <Toolbar variant="dense" />
              <Grid item container spacing={2} alignContent="start">
                <Grid item xs={12}>
                  <Box pt={1} pb={1}>
                    <ContentName
                      text={name}
                      // placeholder="Your Experience"
                      type="input"
                      submit={handleUpdateName}
                    >
                      <TextField
                        variant="standard"
                        type="text"
                        name="task"
                        fullWidth
                        placeholder="Your Experience"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={handleUpdateName}
                        size="small"
                        autoFocus={true}
                        // sx={{
                        //   '& .MuiOutlinedInput-root': {
                        //     fontWeight: 900,
                        //   },
                        // }}
                        // InputProps={{
                        //   style: { width: `${inputWidth}px` },
                        // }}
                      />
                    </ContentName>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormCreateContent
                    content={content}
                    onSubmit={handleAppend}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              width="58.333333333%"
              bgcolor="background.paper"
              borderLeft={1}
              borderColor="divider"
              // display="flex"
              mt="48px"
              height={vh100 - 48}
            >
              <TextEditor
                text={content.text}
                editorState={editorState}
                onSetEditorState={handleSetEditorState}
                saveStatus={saveStatus}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
export default ViewContent
