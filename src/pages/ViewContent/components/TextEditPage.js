import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Box,
  Chip,
  Typography,
  IconButton,
  Button,
  Card,
  CardActionArea,
  Toolbar,
  AppBar,
} from '@mui/material'
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
// import ContentName from './ContentName'
// import TextEditor from './TextEditor'
import { use100vh } from 'hooks/use-100-vh'
import useRequest from 'hooks/use-request'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Add, Edit } from '@mui/icons-material'
import './inputs.css'
import { LoadingButton } from '@mui/lab'
import DialogContentQuestions from './DialogContentQuestions'
import 'draft-js/dist/Draft.css'

const TextEditPage = () => {
  const { id } = useParams()
  const { select, update } = useContentStore()
  const content = select(id)
  const { titleInternal } = content
  const [saveStatus, setSaveStatus] = useState('saved')
  const { title, subtitle, text } = content || {}

  const [editorState, setEditorState] = useState(
    !!text
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
      : EditorState.createEmpty()
  )

  const [titleState, setTitleState] = useState(
    EditorState.createWithContent(ContentState.createFromText(title || ''))
  )

  const [subtitleState, setSubtitleState] = useState(
    EditorState.createWithContent(ContentState.createFromText(subtitle || ''))
  )

  let generationStep

  if (
    editorState.getCurrentContent().getPlainText().length > 0 ||
    (titleState.getCurrentContent().getPlainText().length > 0 &&
      subtitleState.getCurrentContent().getPlainText().length > 0)
  ) {
    generationStep = 'text'
  } else if (titleState.getCurrentContent().getPlainText().length > 0) {
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

  // const handleUpdate = async values => {
  //   try {
  //     await update({ id, ...values })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const toolbarOptions = ['history', 'inline', 'list']

  // const inlineOptions = ['bold', 'italic', 'underline']

  // const [name, setName] = useState(titleInternal || '')

  // useEffect(() => {
  //   setName(titleInternal)
  // }, [titleInternal])

  // const handleUpdateName = () => {
  //   update({ id, titleInternal: name })
  // }

  const handleUpdateText = async () => {
    const newText = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    )
    const newTitle = titleState.getCurrentContent().getPlainText()
    const newSubtitle = subtitleState.getCurrentContent().getPlainText()
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
        },
      })
      const { message, options } = res.data
      setGenerations({ type: generationStep, message, options })
    } catch (err) {
      console.log(err)
    }

    setIsGenerating(false)
  }

  const handleSetEditorState = editorState => {
    setSaveStatus('unsaved')
    setEditorState(editorState)
  }

  const { select: selectOrganization } = useOrganizationsStore()

  const { select: selectIndividual } = useIndividualsStore()

  const { select: selectType } = useContentTypesStore()
  const type = selectType(content.type)

  const handleChangeTitle = text => {
    setSaveStatus('unsaved')
    setTitleState(text)
  }

  const handleChangeSubtitle = text => {
    setSaveStatus('unsaved')
    setSubtitleState(text)
  }

  console.log(subtitleState.getCurrentContent().getPlainText())

  const savingText =
    saveStatus === 'saving'
      ? 'Saving...'
      : saveStatus === 'saved'
      ? 'Saved'
      : 'Unsaved Changes'

  const handleAppend = i => {
    if (generations.type === 'text') {
      const currentContent = editorState.getCurrentContent()

      const editorStateWithFocusAtEnd = EditorState.moveFocusToEnd(editorState)
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
        editorState,
        newContent,
        'split-block'
      )

      const newEditorState = EditorState.moveSelectionToEnd(editorWithInsert)

      setEditorState(newEditorState)
    } else {
      const newContent = ContentState.createFromText(generations.options[i])

      if (generations.type === 'title') {
        const newEditorState = EditorState.push(
          titleState,
          newContent,
          'insert-characters'
        )
        setTitleState(newEditorState)
      } else {
        const newEditorState = EditorState.push(
          subtitleState,
          newContent,
          'insert-characters'
        )
        setSubtitleState(newEditorState)
      }
    }
    setSaveStatus('unsaved')
  }

  const [DialogEditSettings, setDialogEditSettings] = useState(
    !content.individuals ||
      content.individuals.length === 0 ||
      !content.answers ||
      content.answers.length === 0
  )

  return (
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
      <DialogContentQuestions
        open={DialogEditSettings}
        onClose={() => setDialogEditSettings(false)}
        id={id}
      />
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
            <Box mr={1}>
              <Typography
                color="grey.500"
                variant="body2"
                fontSize="12px"
                pt="2px"
              >
                <b>{savingText}</b>
              </Typography>
            </Box>
            <Box>
              <Button
                endIcon={<Edit />}
                sx={{ textTransform: 'none' }}
                color="secondary"
                onClick={() => setDialogEditSettings(true)}
              >
                Background
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Box height={vh100 - 48} width="30%" p={3} overflow="scroll">
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
                    <Card variant="outlined" color="inherit">
                      <CardActionArea onClick={() => handleAppend(i)}>
                        <Box display="flex" alignItems="center" p={1}>
                          <Box flexGrow={1}>
                            <Typography variant="body2">
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
            {!isGenerating && generations.message && (
              <Grid item xs={12}>
                <Typography variant="body2">
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {generations.message}
                  </span>
                </Typography>
              </Grid>
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
          position="relative"
        >
          <Box overflow="scroll" height="100%" p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} id="title">
                <Editor
                  editorState={titleState}
                  onChange={handleChangeTitle}
                  placeholder="Title"
                  stripPastedStyles
                  blockStyleFn={titleStyleFn}
                />
              </Grid>
              <Grid item xs={12} id="subtitle">
                <Editor
                  editorState={subtitleState}
                  onChange={handleChangeSubtitle}
                  placeholder="Subtitle"
                  stripPastedStyles
                  blockStyleFn={subtitleStyleFn}
                />
              </Grid>
              <Grid item xs={12}>
                <Editor
                  editorState={editorState}
                  onChange={handleSetEditorState}
                  placeholder="Body"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box height={vh100 - 48} width="20%" overflow="scroll">
          {/* <Toolbar variant="dense" /> */}
          <Grid item container alignContent="start">
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" p={2} pt={1}>
                {/* <Box flexGrow={1} borderLeft="2px solid #e0e0e0" pl={1} pr={1}> */}

                <Box fontSize="10pt" lineHeight={2}>
                  A <Chip label={type.secondary} size="small" />{' '}
                  <Chip label={type.primary} size="small" /> for{' '}
                  {content.organizations.map(organizationId => {
                    const organization = selectOrganization(organizationId)
                    return (
                      <Chip
                        label={organization.name}
                        key={organizationId}
                        size="small"
                      />
                    )
                  })}{' '}
                  {content.individualsQuoted &&
                    content.individualsQuoted.length > 0 &&
                    'featuring quotes from '}
                  {content.individualsQuoted &&
                    content.individualsQuoted.length > 0 &&
                    content.individualsQuoted.map(individualId => {
                      const individual = selectIndividual(individualId)
                      return (
                        <Chip
                          label={individual.name}
                          key={individualId}
                          size="small"
                        />
                      )
                    })}
                  {/* with <Chip label="1/6" size="small" /> key questions answered. */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
export default TextEditPage
