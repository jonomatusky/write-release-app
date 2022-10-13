import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogBackground from './DialogBackground'
import useQuestionsStore from 'hooks/store/use-questions-store'

const PanelBackground = ({ id }) => {
  const { select } = useContentStore()
  const content = select(id)

  const { select: selectQuestion } = useQuestionsStore()
  const { answers } = content || []

  const backgroundAnswers = answers
    .filter(answer => {
      let question = selectQuestion(answer.question)
      const { isDefault, section } = question || {}
      return isDefault && (!section || section === 'background')
    })
    .filter(answer => answer.question !== '63458648466e61f33669deaf')

  const backgroundAnswer = (backgroundAnswers || [])[0] || {}

  const text =
    backgroundAnswer.answer ||
    `You haven't answered any background questions yet`

  return (
    <Grid item xs={12}>
      <PanelEdit dialog={DialogBackground} dialogProps={{ id }}>
        <Box p={2} pt={1}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Typography color="primary" pb={0.5} variant="body2">
                <b>Background</b>
              </Typography>
            </Grid>
            <Grid item xs={12} overflow="hidden">
              <Typography
                variant="body2"
                sx={{
                  display: '-webkit-box',
                  overflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                {text}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </PanelEdit>
    </Grid>
  )
}
export default PanelBackground
