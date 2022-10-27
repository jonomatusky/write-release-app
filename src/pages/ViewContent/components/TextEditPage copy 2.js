import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Card,
  CardActionArea,
  Toolbar,
  AppBar,
  Button,
} from '@mui/material'
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  CompositeDecorator,
  SelectionState,
} from 'draft-js'
import usePageTitle from 'hooks/use-page-title'
import useContentStore from 'hooks/store/use-content-store'
// import ContentName from './ContentName'
// import TextEditor from './TextEditor'
import { use100vh } from 'hooks/use-100-vh'
import useRequest from 'hooks/use-request'
import { Add } from '@mui/icons-material'
import './inputs.css'
import { LoadingButton } from '@mui/lab'
import 'draft-js/dist/Draft.css'
import PanelQuotes from './PanelQuotes'
import PanelSubject from './PanelSubject'
import PanelBackground from './PanelBackground'
import PanelAbout from './PanelAbout'
import PanelHiring from './PanelHiring'
import ButtonCopyContent from './ButtonCopyContent'
import PanelResources from './PanelResources'
import useUserStore from 'hooks/store/use-user-store'

const tabEntity = `{{TAB}}`
const tabEntity2 = `{{TAB}`

const TextEditPage = () => {
  const { id } = useParams()
  const { select, update } = useContentStore()
  const content = select(id)
  const { titleInternal } = content
  const [saveStatus, setSaveStatus] = useState('saved')
  const { title, subtitle, text, boilerplate } = content || {}
  const { item: user } = useUserStore()

  const [isEditing, setIsEditing] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const getCompositeDecorator = useCallback(show => {
    const findInstructions = (contentBlock, callback, contentState) => {
      const text = contentBlock.getText()
      let start

      if (text.indexOf(tabEntity) >= 0) {
        start = text.indexOf(tabEntity)
        callback(start, start + tabEntity.length)
      } else if (text.indexOf(tabEntity2) >= 0) {
        start = text.indexOf(tabEntity2)
        callback(start, start + tabEntity2.length)
      }
    }

    let TabEntity = () => {
      if (!show) {
        return <span></span>
      } else {
        return (
          <span contentEditable={false} style={{ color: '#ababab' }}>
            {' '}
            Press <b>tab</b> to continue writing
          </span>
        )
      }
    }

    return new CompositeDecorator([
      {
        strategy: findInstructions,
        component: TabEntity,
      },
    ])
  }, [])

  const removeTabEntity = useCallback(editorState => {
    let contentState = editorState.getCurrentContent()
    const blockMap = contentState.getBlockMap()

    // remove all tab entities
    blockMap.forEach(block => {
      const key = block.getKey()
      const textBlock = block.getText()

      const start = textBlock.indexOf(tabEntity)

      if (start >= 0) {
        const selection = SelectionState.createEmpty(key).merge({
          anchorOffset: start,
          focusOffset: start + tabEntity.length,
        })

        contentState = Modifier.replaceText(contentState, selection, '')
      }
    })

    blockMap.forEach(block => {
      const key = block.getKey()
      const textBlock = block.getText()

      const start = textBlock.indexOf(tabEntity2)

      if (start >= 0) {
        const selection = SelectionState.createEmpty(key).merge({
          anchorOffset: start,
          focusOffset: start + tabEntity2.length,
        })

        contentState = Modifier.replaceText(contentState, selection, '')
      }
    })

    return contentState
  }, [])

  const [editorsState, setEditorsState] = useState({
    text: !!text
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(text)),
          getCompositeDecorator()
        )
      : EditorState.createEmpty(getCompositeDecorator()),
    title: EditorState.createWithContent(
      ContentState.createFromText(title || '')
    ),
    subtitle: EditorState.createWithContent(
      ContentState.createFromText(subtitle || '')
    ),
    boilerplate: !!boilerplate
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(boilerplate)))
      : EditorState.createEmpty(),
  })

  const textsState = Object.keys(editorsState).reduce((acc, key) => {
    acc[key] = editorsState[key].getCurrentContent().getPlainText()
    return acc
  }, {})

  const handleBlur = () => {
    console.log(isFocused)
    setIsFocused(false)
    setIsEditing(false)
    const text = editorsState.text

    const contentState = removeTabEntity(text)
    const editorState = EditorState.push(text, contentState)

    setEditorsState({
      ...editorsState,
      text: EditorState.set(editorState, {
        decorator: getCompositeDecorator(),
      }),
    })
  }

  const hasText = text => text.length > 0

  let generationStep

  if (
    hasText(textsState.text) ||
    (hasText(textsState.title) > 0 && hasText(textsState.subtitle) > 0)
  ) {
    generationStep = 'text'
  } else if (hasText(textsState.title)) {
    generationStep = 'subtitle'
  } else {
    generationStep = 'title'
  }

  const titleStyleFn = () => {
    return 'titleInput'
  }

  const subtitleStyleFn = () => {
    return 'subtitleInput'
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

  // console.log(editorsState.text.getCurrentContent().getPlainText())

  const handleSetEditorsState = (field, value) => {
    if (!isEditing) {
      setIsEditing(true)
    }

    if (field === 'text') {
      const selectionState = value.getSelection()
      const contentState = removeTabEntity(value)
      let newValue = EditorState.push(value, contentState)
      let newNewValue = EditorState.acceptSelection(newValue, selectionState)

      setEditorsState({
        ...editorsState,
        text: EditorState.set(newNewValue, {
          decorator: getCompositeDecorator(),
        }),
      })
    } else {
      setEditorsState({
        ...editorsState,
        [field]: value,
      })
    }

    setSaveStatus('unsaved')
  }

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        setIsEditing(false)
        console.log('inserting tab')

        if (isFocused) {
          console.log('focused')
          const text = editorsState.text
          const selectorState = text.getSelection()

          const contentState = removeTabEntity(text)

          // add tab to current block
          const block = contentState.getBlockForKey(selectorState.getEndKey())

          let blockLength = block.getLength()

          const cursorIsAtEnd =
            selectorState.getEndOffset() === blockLength &&
            selectorState.isCollapsed()

          if (cursorIsAtEnd) {
            // change selector state to only at end
            console.log('cursor is at end')

            const newContentState = Modifier.insertText(
              contentState,
              selectorState,
              tabEntity
            )

            const newEditorState = EditorState.push(text, newContentState)
            const newestEditorState = EditorState.acceptSelection(
              newEditorState,
              selectorState
            )

            setEditorsState({
              ...editorsState,
              text: EditorState.set(newestEditorState, {
                decorator: getCompositeDecorator(true),
              }),
            })
          }
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [
    isEditing,
    editorsState,
    getCompositeDecorator,
    removeTabEntity,
    isFocused,
  ])

  const savingText =
    saveStatus === 'saving'
      ? 'Saving...'
      : saveStatus === 'saved'
      ? 'Saved'
      : 'Unsaved Changes'

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
            <Box>
              <Typography
                color="grey.500"
                variant="body2"
                fontSize="12px"
                pt="2px"
              >
                <b>{savingText}</b>
              </Typography>
            </Box>

            <ButtonCopyContent id={id} color="grey.800" />
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
                Generate{' '}
                {generationStep === 'title'
                  ? 'Headline'
                  : generationStep === 'subtitle'
                  ? 'Subheadline'
                  : 'Text'}
              </LoadingButton>
            </Grid>
            {!isGenerating &&
              (generations.options || []).map((generation, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <Card variant="outlined" color="inherit">
                      <CardActionArea onClick={() => handleAppend(i)}>
                        <Box display="flex" alignItems="center" p={1}>
                          <Box flexGrow={1}>
                            <Typography
                              variant="body2"
                              sx={{ whiteSpace: 'pre-line' }}
                            >
                              {generation}
                            </Typography>
                          </Box>
                          <Box>
                            <IconButton color="inherit" size="small" ml={1}>
                              <Add />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardActionArea>
                    </Card>
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
                  placeholder="Headline"
                  stripPastedStyles
                  blockStyleFn={titleStyleFn}
                />
              </Grid>
              <Grid item xs={12} id="subtitle">
                <Editor
                  editorState={editorsState.subtitle}
                  onChange={value => handleSetEditorsState('subtitle', value)}
                  placeholder="Subheadline"
                  stripPastedStyles
                  blockStyleFn={subtitleStyleFn}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  editorState={editorsState.text}
                  onChange={value => handleSetEditorsState('text', value)}
                  placeholder="Body"
                  onBlur={handleBlur}
                  onFocus={() => setIsFocused(true)}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  editorState={editorsState.boilerplate}
                  onChange={value =>
                    handleSetEditorsState('boilerplate', value)
                  }
                  placeholder="Boilerplate"
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
          {/* <Toolbar variant="dense" /> */}

          <Grid item container alignContent="start" spacing={2} p={1.5} pt={2}>
            <PanelAbout id={id} />
            <PanelResources id={id} />
            <PanelHiring id={id} />
            <PanelSubject id={id} />
            <PanelBackground id={id} />
            <PanelQuotes id={id} />
          </Grid>
        </Box>
      </Box>
    </>
  )
}
export default TextEditPage
