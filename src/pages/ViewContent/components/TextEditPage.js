import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Box, Typography, Toolbar, AppBar, Button } from '@mui/material'
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  CompositeDecorator,
  SelectionState,
  getDefaultKeyBinding,
} from 'draft-js'
import usePageTitle from 'hooks/use-page-title'
import useContentStore from 'hooks/store/use-content-store'
// import ContentName from './ContentName'
// import TextEditor from './TextEditor'
import { use100vh } from 'hooks/use-100-vh'
import useRequest from 'hooks/use-request'
import { CheckCircleOutline, Sync } from '@mui/icons-material'
import './inputs.css'
import { LoadingButton } from '@mui/lab'
import 'draft-js/dist/Draft.css'
import PanelQuotes from './PanelQuotes'
import PanelSubject from './PanelSubject'
import PanelBackground from './PanelBackground'
import PanelAbout from './PanelAbout'
import PanelHiring from './PanelHiring'
import PanelResources from './PanelResources'
import MenuContent from './MenuContent'
import GeneratedOption from 'components/GeneratedOption'
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

  const getCompositeDecorator = useCallback(() => {
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
      return (
        <span contentEditable={false} style={{ color: '#ababab' }}>
          {' '}
          Press <b>tab</b> to continue writing
        </span>
      )
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

  const [inlineAvailable, setInlineAvailable] = useState(false)

  const handleBlur = () => {
    setIsFocused(false)
    setIsEditing(false)
    setFocusField(null)
    const text = editorsState.text

    const contentState = removeTabEntity(text)
    const editorState = EditorState.set(text, {
      currentContent: contentState,
    })

    setInlineAvailable(false)
    setEditorsState({
      ...editorsState,
      text: editorState,
    })
  }

  const handleFocus = () => {
    setFocusField('inline')
    setIsFocused(true)
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

  const [focusField, setFocusField] = useState(null)
  const operationType = focusField || generationStep

  useEffect(() => {
    setGenerationIteration(0)
  }, [operationType])

  const titleStyleFn = () => {
    return 'titleInput'
  }

  const subtitleStyleFn = () => {
    return 'subtitleInput'
  }

  usePageTitle((!!titleInternal ? titleInternal + ' | ' : '') + 'SourceOn')

  const handleUpdateText = async () => {
    const cleanedText = removeTabEntity(editorsState.text)

    const newText = JSON.stringify(convertToRaw(cleanedText))
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

  const { request, cancel } = useRequest()

  const [generations, setGenerations] = useState({
    type: 'none',
    prompt: '',
    options: [],
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const [generationIteration, setGenerationIteration] = useState(0)

  const handleGenerate = async () => {
    setIsGenerating(true)
    cancel()
    const type = operationType

    try {
      await handleUpdateText()
      const res = await request({
        url: `/generator`,
        method: 'POST',
        data: {
          contentId: id,
          operationType: type,
          iteration: generationIteration,
        },
        timeout: 15000,
      })

      if (!!res) {
        const { message, options } = res.data

        if (type !== 'inline') {
          setGenerationIteration(generationIteration + 1)
        }

        // if (isGenerating) {
        //   console.log('setting generations')
        setGenerations({ type, message, options })
        // }
      }
    } catch (err) {
      console.log(err)
    }

    setIsGenerating(false)
  }

  // console.log(editorsState.text.getCurrentContent().getPlainText())

  const handleSetEditorsState = (field, value) => {
    setIsGenerating(false)
    cancel()

    if (!isEditing) {
      setIsEditing(true)
    }

    if (field === 'text') {
      const selectionState = value.getSelection()
      const contentState = removeTabEntity(value)
      // let newValue = EditorState.push(value, contentState)
      // let newNewValue = EditorState.acceptSelection(newValue, selectionState)
      let newNewValue = EditorState.set(value, {
        currentContent: contentState,
        selection: selectionState,
      })
      setInlineAvailable(false)
      setEditorsState({
        ...editorsState,
        text: newNewValue,
      })
    } else {
      setInlineAvailable(false)
      setEditorsState({
        ...editorsState,
        [field]: value,
      })
    }

    setSaveStatus('unsaved')
  }

  useEffect(() => {
    if (isEditing && !isGenerating) {
      const timer = setTimeout(() => {
        setIsEditing(false)

        if (isFocused) {
          const text = editorsState.text
          const selectorState = text.getSelection()

          const contentState = removeTabEntity(text)

          // add tab to current block
          const block = contentState.getBlockForKey(selectorState.getEndKey())

          let blockLength = block.getLength()
          const position = selectorState.getEndOffset()

          const cursorIsAtEnd =
            selectorState.isCollapsed() &&
            (selectorState.getEndOffset() === blockLength ||
              block.getText()[position] === '\n')

          if (cursorIsAtEnd) {
            // change selector state to only at end
            const newContentState = Modifier.insertText(
              contentState,
              selectorState,
              tabEntity
            )

            const newEditorState = EditorState.set(text, {
              currentContent: newContentState,
              selection: selectorState,
            })

            // const newestEditorState = EditorState.acceptSelection(
            //   newEditorState,
            //   selectorState
            // )

            console.log('setting editors state')

            setInlineAvailable(true)
            setEditorsState({
              ...editorsState,
              text: newEditorState,
            })
          }
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isEditing, editorsState, removeTabEntity, isFocused, isGenerating])

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

  const handleAppend = id => {
    const generation = generations.options.find(g => g.id === id)

    if (!!generation) {
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
          generation.text + '\n',
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
          ContentState.createFromText(generation.text),
          'insert-characters'
        )

        handleSetEditorsState(generations.type, newEditorState)
      }

      setSaveStatus('unsaved')
      setGenerationIteration(0)
    }
  }

  const myKeyBindingFn = e => {
    if (e.keyCode === 9) {
      return 'generate-inline'
    }
    return getDefaultKeyBinding(e)
  }

  const handleKeyCommand = command => {
    if (command === 'generate-inline') {
      if (inlineAvailable) {
        handleGenerate()

        return 'handled'
      } else {
        return 'not-handled'
      }
    }
    return 'not-handled'
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
          p={2}
          pr={1.5}
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
                size="large"
              >
                Generate{' '}
                {operationType === 'title'
                  ? 'Headline'
                  : operationType === 'subtitle'
                  ? 'Subheadline'
                  : 'Text'}
              </LoadingButton>
            </Grid>
            {!isGenerating &&
              (generations.options || []).map((generation, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <GeneratedOption
                      generation={generation}
                      onClick={handleAppend}
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
                  placeholder="Headline"
                  stripPastedStyles
                  blockStyleFn={titleStyleFn}
                  // onBlur={() => setFocusField(null)}
                  onFocus={() => setFocusField('title')}
                />
              </Grid>
              <Grid item xs={12} id="subtitle">
                <Editor
                  editorState={editorsState.subtitle}
                  onChange={value => handleSetEditorsState('subtitle', value)}
                  placeholder="Subheadline"
                  stripPastedStyles
                  blockStyleFn={subtitleStyleFn}
                  // onBlur={() => setFocusField(null)}
                  onFocus={() => setFocusField('subtitle')}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  editorState={editorsState.text}
                  onChange={value => handleSetEditorsState('text', value)}
                  placeholder="Body"
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  handleKeyCommand={handleKeyCommand}
                  keyBindingFn={myKeyBindingFn}
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

          <Grid
            item
            container
            alignContent="start"
            spacing={2}
            p={1.5}
            pt={2}
            pr={2}
          >
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
