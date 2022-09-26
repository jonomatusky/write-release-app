import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Grid,
  Box,
  Chip,
  Typography,
  TextField,
  Toolbar,
  IconButton,
  Button,
} from '@mui/material'
import {
  Editor,
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  RichUtils,
} from 'draft-js'
import useHistoryStore from 'hooks/store/use-history-store'
import useSession from 'hooks/use-session'
import useFetchCoverage from 'hooks/use-fetch-coverage'
import usePageTitle from 'hooks/use-page-title'
import useContentStore from 'hooks/store/use-content-store'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ContentName from './ContentName'
import TextEditor from './TextEditor'
import { use100vh } from 'hooks/use-100-vh'
import useRequest from 'hooks/use-request'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { ArrowForward, ArrowForwardIos, Edit } from '@mui/icons-material'
import './inputs.css'

const TextEditPageAlt = () => {
  const { id } = useParams()
  const { select, update } = useContentStore()
  const content = select(id)
  const { titleInternal } = content
  const [saveStatus, setSaveStatus] = useState('saved')

  const { title, subtitle, text } = content || {}

  const [generationStep, setGenerationStep] = useState(
    !title && !subtitle & !text
      ? 'title'
      : !subtitle && !text
      ? 'subtitle'
      : 'text'
  )

  console.log('generation step')

  const [editorState, setEditorState] = useState(
    !!text
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(text)))
      : EditorState.createEmpty().stripPastedStyles()
  )

  const [titleState, setTitleState] = useState(
    EditorState.createWithContent(ContentState.createFromText(title || ''))
  )

  const [subtitleState, setSubtitleState] = useState(
    EditorState.createWithContent(ContentState.createFromText(subtitle || ''))
  )

  const titleStyleFn = () => {
    return 'titleInput'
  }

  const subtitleStyleFn = () => {
    return 'subtitleInput'
  }

  usePageTitle((!!titleInternal ? titleInternal + ' | ' : '') + 'SourceOn')

  const handleUpdate = async values => {
    try {
      await update({ id, ...values })
    } catch (err) {
      console.log(err)
    }
  }

  const toolbarOptions = ['history', 'inline', 'list']

  const inlineOptions = ['bold', 'italic', 'underline']

  const [name, setName] = useState(titleInternal || '')

  useEffect(() => {
    setName(titleInternal)
  }, [titleInternal])

  const handleUpdateName = () => {
    update({ id, titleInternal: name })
  }

  const handleUpdateText = async () => {
    const newText = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    )
    const newTitle = titleState.getCurrentContent().getPlainText()
    setSaveStatus('saving')
    await update({ id, text: newText, title: newTitle })
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

  const handleAppend = async values => {
    // const { _id, ...newValues } = values

    let text

    try {
      // await update({ id, ...newValues })
      const res = await request({
        url: `/generator`,
        method: 'POST',
        data: {
          contentId: id,
        },
      })
      console.log(res)
      const options = res.data
      setGenerations = { type: 'tile', ...options }
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

  const savingText =
    saveStatus === 'saving'
      ? 'Saving...'
      : saveStatus === 'saved'
      ? 'Saved'
      : 'Unsaved Changes'

  const handlePushContent = () => {}

  const [generations, setGenerations] = useState({ type: 'none', options: [] })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex">
          <Box
            height={vh100}
            width="41.66666666667%"
            p={1}
            pl={3}
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
                <Box display="flex" alignItems="center">
                  <Box
                    flexGrow={1}
                    borderLeft="2px solid #e0e0e0"
                    pl={1}
                    pr={1}
                  >
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
                      featuring quotes from{' '}
                      {content.individualsQuoted.map(individualId => {
                        const individual = selectIndividual(individualId)
                        return (
                          <Chip
                            label={individual.name}
                            key={individualId}
                            size="small"
                          />
                        )
                      })}{' '}
                      with <Chip label="1/6" size="small" /> key questions
                      answered.
                    </Box>
                  </Box>
                  <Box>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Box>
                </Box>

                {/* <FormCreateContent
                    content={content}
                    onSubmit={handleAppend}
                  /> */}
              </Grid>
              <Grid item xs={12} pr={1}>
                <Box display="flex">
                  <Box>
                    <Button>
                      <ArrowForwardIos />
                    </Button>
                  </Box>
                </Box>

                <Button fullWidth variant="contained" onClick={handleAppend}>
                  Create{' '}
                  {!!title ? 'Title ' : !!subtitle ? 'Subtitle ' : 'Content'}
                </Button>
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
            p={3}
            position="relative"
          >
            <Box
              height="46px"
              display="flex"
              alignItems="center"
              position="absolute"
              top="0"
              right="15px"
              color="grey.500"
            >
              <Typography variant="body2" fontSize="12px">
                <b>{savingText}</b>
              </Typography>
            </Box>
            <Grid container spacing={0}>
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
      </Grid>
      <Grid item xs={12}>
        <Box display="flex">
          <Box
            height={vh100}
            width="41.66666666667%"
            p={1}
            pl={3}
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
                <Box display="flex" alignItems="center">
                  <Box
                    flexGrow={1}
                    borderLeft="2px solid #e0e0e0"
                    pl={1}
                    pr={1}
                  >
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
                      featuring quotes from{' '}
                      {content.individualsQuoted.map(individualId => {
                        const individual = selectIndividual(individualId)
                        return (
                          <Chip
                            label={individual.name}
                            key={individualId}
                            size="small"
                          />
                        )
                      })}{' '}
                      with <Chip label="1/6" size="small" /> key questions
                      answered.
                    </Box>
                  </Box>
                  <Box>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Box>
                </Box>

                {/* <FormCreateContent
                    content={content}
                    onSubmit={handleAppend}
                  /> */}
              </Grid>
              <Grid item xs={12} pr={1}>
                <Button fullWidth variant="contained" onClick={handleAppend}>
                  Generate{' '}
                  {!!title ? 'Title ' : !!subtitle ? 'Subtitle ' : 'Content'}
                </Button>
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
            p={3}
            position="relative"
          >
            <Box
              height="46px"
              display="flex"
              alignItems="center"
              position="absolute"
              top="0"
              right="15px"
              color="grey.500"
            >
              <Typography variant="body2" fontSize="12px">
                <b>{savingText}</b>
              </Typography>
            </Box>
            <Grid container spacing={0}>
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
      </Grid>
      <Grid item xs={12}>
        <Box display="flex">
          <Box
            height={vh100}
            width="41.66666666667%"
            p={1}
            pl={3}
            pt={0}
            overflow="scroll"
          >
            <Toolbar variant="dense" />
            <Grid item container spacing={2} alignContent="start">
              <Grid item xs={12} pr={1}>
                <Button fullWidth variant="contained" onClick={handleAppend}>
                  Generate{' '}
                  {!!title ? 'Title ' : !!subtitle ? 'Subtitle ' : 'Content'}
                </Button>
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
            p={3}
            position="relative"
          >
            <Box
              height="46px"
              display="flex"
              alignItems="center"
              position="absolute"
              top="0"
              right="15px"
              color="grey.500"
            >
              <Typography variant="body2" fontSize="12px">
                <b>{savingText}</b>
              </Typography>
            </Box>
            <Grid container spacing={0}>
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
      </Grid>
    </Grid>
  )
}
export default TextEditPageAlt
