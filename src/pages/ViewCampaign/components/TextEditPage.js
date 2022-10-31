import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Box, Typography, Toolbar, AppBar, Button } from '@mui/material'
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from 'draft-js'
import usePageTitle from 'hooks/use-page-title'
import useContentStore from 'hooks/store/use-content-store'
import { use100vh } from 'hooks/use-100-vh'
import useRequest from 'hooks/use-request'
import { CheckCircleOutline, Sync } from '@mui/icons-material'
import './inputs.css'
import { LoadingButton } from '@mui/lab'
import 'draft-js/dist/Draft.css'
import PanelSubject from './PanelSubject'
import PanelAbout from './PanelAbout'
import PanelResources from './PanelResources'
import MenuContent from './MenuContent'
import GeneratedOption from 'components/GeneratedOption'
import useUserStore from 'hooks/store/use-user-store'

const TextEditPage = () => {
  const { id } = useParams()
  const { select, update } = useContentStore()
  const content = select(id)
  const { titleInternal } = content
  const [saveStatus, setSaveStatus] = useState('saved')
  const { title, text } = content || {}
  const { item: user } = useUserStore()

  const [editorsState, setEditorsState] = useState({
    text: !!text
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
      : EditorState.createEmpty(),
    title: EditorState.createWithContent(
      ContentState.createFromText(title || '')
    ),
  })

  const textsState = Object.keys(editorsState).reduce((acc, key) => {
    acc[key] = editorsState[key].getCurrentContent().getPlainText()
    return acc
  }, {})

  let generationStep = 'text'

  const titleStyleFn = () => {
    return 'titleInput'
  }

  usePageTitle((!!titleInternal ? titleInternal + ' | ' : '') + 'SourceOn')

  const handleUpdateText = async () => {
    const newText = JSON.stringify(
      convertToRaw(editorsState.text.getCurrentContent())
    )
    const newTitle = textsState.title
    const newSubtitle = textsState.subtitle
    setSaveStatus('saving')
    await update({ id, text: newText, title: newTitle, subtitle: newSubtitle })
    setSaveStatus('saved')
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (saveStatus === 'unsaved') {
        try {
          await handleUpdateText()
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

  const [generations, setGenerations] = useState({
    type: 'none',
    prompt: '',
    options: [],
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const [generationIteration, setGenerationIteration] = useState(0)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      await handleUpdateText()
      const res = await request({
        url: `/generator`,
        method: 'POST',
        data: {
          contentId: id,
          operationType: generationStep,
          iteration: generationIteration,
        },
        timeout: 15000,
      })
      const { message, options } = res.data
      setGenerations({ type: generationStep, message, options })
      setGenerationIteration(generationIteration + 1)
    } catch (err) {
      console.log(err)
    }

    setIsGenerating(false)
  }

  const handleSetEditorsState = (field, value) => {
    setEditorsState({
      ...editorsState,
      [field]: value,
    })
    setSaveStatus('unsaved')
  }

  const SavingText = () => {
    return (
      <Box display="flex" alignItems="center" color="grey.500" pr={1}>
        {saveStatus === 'saving' ? (
          <Sync fontSize="small" sx={{ pr: 0.5 }} />
        ) : saveStatus === 'saved' ? (
          <CheckCircleOutline fontSize="small" sx={{ pr: 0.5 }} />
        ) : (
          <></>
        )}
        <Typography color="inherit" variant="body2" fontSize="12px" pt="2px">
          <b>
            {saveStatus === 'saving'
              ? 'Saving...'
              : saveStatus === 'saved'
              ? 'Saved'
              : 'Unsaved Changes'}
          </b>
        </Typography>
      </Box>
    )
  }

  const handleAppend = i => {
    if (generations.type === 'text') {
      const currentContent = editorsState.text.getCurrentContent()

      const editorStateWithFocusAtEnd = EditorState.moveFocusToEnd(
        editorsState.text
      )
      const selection = editorStateWithFocusAtEnd.getSelection()

      const blockContent = currentContent.getLastBlock().getText()

      const textWithInsert = Modifier.insertText(
        currentContent,
        selection,
        generations.options[i] + '\n',
        null
      )

      let newContent = textWithInsert

      if (blockContent !== '') {
        newContent = Modifier.splitBlock(textWithInsert, selection)
      } else {
        newContent = textWithInsert
      }

      const editorWithInsert = EditorState.push(
        editorsState.text,
        newContent,
        'split-block'
      )

      const newEditorState = EditorState.moveSelectionToEnd(editorWithInsert)

      handleSetEditorsState('text', newEditorState)
    } else {
      const newEditorState = EditorState.push(
        editorsState[generations.type],
        ContentState.createFromText(generations.options[i]),
        'insert-characters'
      )

      handleSetEditorsState(generations.type, newEditorState)
    }

    setSaveStatus('unsaved')
    setGenerationIteration(0)
  }

  const [messageOpen, setMessageOpen] = useState(false)

  const handleToggleMessage = () => {
    setMessageOpen(!messageOpen)
  }

  return (
    <>
      <AppBar
        color="inherit"
        position="fixed"
        elevation={0}
        sx={{
          // zIndex: theme => theme.zIndex.drawer + 1,
          // width: `calc(100% - ${drawerWidth}px)`,
          // ml: `${drawerWidth}px`,
          borderBottom: '1px solid #e0e0e0',
        }}
        open={true}
      >
        <Toolbar variant="dense">
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="flex-end"
          >
            <SavingText />
            <MenuContent id={id} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Box
          height={vh100 - 48}
          width="30%"
          p={3}
          sx={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {/* <Toolbar variant="dense" /> */}
          <Grid item container spacing={2} alignContent="start">
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={handleGenerate}
                loading={isGenerating}
              >
                Generate {generationStep}
              </LoadingButton>
            </Grid>
            {!isGenerating &&
              (generations.options || []).map((generation, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <GeneratedOption
                      index={i}
                      onClick={handleAppend}
                      text={generation}
                    />
                  </Grid>
                )
              })}
            {!isGenerating && generations.message && user.admin && (
              <>
                <Grid item xs={12} container justifyContent="center">
                  <Box color="gray.500">
                    <Button
                      size="small"
                      onClick={handleToggleMessage}
                      color="inherit"
                    >
                      {messageOpen ? 'Hide Message' : 'Show Message'}
                    </Button>
                  </Box>
                </Grid>
                {messageOpen && (
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <span style={{ whiteSpace: 'pre-line' }}>
                        {generations.message}
                      </span>
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>
        <Box
          width="50%"
          bgcolor="background.paper"
          borderLeft={1}
          borderRight={1}
          borderColor="divider"
          // display="flex"
          // mt="48px"
          height={vh100 - 48}
          // pl={3}
          // pr={1}
          // pt={2}
          // position="relative"
        >
          <Box
            sx={{ overflowY: 'scroll', overflowX: 'hidden' }}
            height="100%"
            p={2}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} id="title">
                <Editor
                  editorState={editorsState.title}
                  onChange={value => handleSetEditorsState('title', value)}
                  placeholder="Title"
                  stripPastedStyles
                  blockStyleFn={titleStyleFn}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  editorState={editorsState.text}
                  onChange={value => handleSetEditorsState('text', value)}
                  placeholder="Body"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          height={vh100 - 48}
          width="20%"
          sx={{
            overflowY: 'scroll',
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <Grid item container alignContent="start" spacing={2} p={1.5} pt={2}>
            <PanelAbout id={id} />
            <PanelResources id={id} />
            <PanelSubject id={id} />
          </Grid>
        </Box>
      </Box>
    </>
  )
}
export default TextEditPage
