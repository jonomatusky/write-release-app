import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogSubject from './DialogSubject'
import useQuestionsStore from 'hooks/store/use-questions-store'

const PanelSubject = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectQuestion } = useQuestionsStore()
  const { answers } = content || []

  const subjectAnswers = answers.filter(answer => {
    let question = selectQuestion(answer.question)

    const { isGeneric, section, contentTypes } = question || {}

    return (
      (isGeneric && section === 'subject') ||
      (contentTypes || []).includes(content.type)
    )
  })

  const subjectAnswer = (subjectAnswers || [])[0] || {}

  const Text = () => {
    return (
      <Typography
        variant="body2"
        sx={{
          display: '-webkit-box',
          overflow: 'ellipsis',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}
      >
        {subjectAnswer.answer || (
          <i>You haven't answered any subject questions yet</i>
        )}
      </Typography>
    )
  }

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogSubject} dialogProps={{ id }}>
        <Box p={2} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Subject</b>
              </Typography>
            </Grid>
            <Grid item xs={12} overflow="hidden">
              <Text />
            </Grid>
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelSubject
