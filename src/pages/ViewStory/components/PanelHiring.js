import React from 'react'
import { Grid, Box, Chip, Typography } from '@mui/material'
import useContentStore from 'hooks/store/use-content-store'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import useContentTypesStore from 'hooks/store/use-content-types-store'
import { Person } from '@mui/icons-material'
import './inputs.css'
import 'draft-js/dist/Draft.css'
import PanelEdit from 'layouts/PanelEdit'
import DialogHiring from './DialogHiring'

const PanelHiring = ({ id }) => {
  const { select } = useContentStore()
  const { select: selectContentType } = useContentTypesStore()
  const content = select(id)
  const contentType = selectContentType(content.type)

  const { select: selectIndividual } = useIndividualsStore()
  const { individualsSubjects } = content

  return (
    <>
      {(contentType.secondary === 'New Hire' ||
        contentType.secondary === 'Board Appointment') && (
        <Grid item xs={12}>
          <PanelEdit dialog={DialogHiring} dialogProps={{ id }}>
            <Box p={2} pt={1}>
              <Grid container spacing={0.5}>
                <Grid item xs={12}>
                  <Typography color="primary" pb={0.5} variant="body2">
                    <b>
                      {contentType.secondary === 'New Hire'
                        ? 'New Hire'
                        : 'Appointment'}
                    </b>
                  </Typography>
                </Grid>
                {individualsSubjects &&
                  individualsSubjects.length > 0 &&
                  individualsSubjects.map(individualId => {
                    const individual = selectIndividual(individualId)
                    return (
                      <Grid item xs={12} key={individualId}>
                        <Chip
                          label={individual.name}
                          size="small"
                          icon={<Person />}
                        />
                      </Grid>
                    )
                  })}
              </Grid>
            </Box>
          </PanelEdit>
        </Grid>
      )}
    </>
  )
}
export default PanelHiring
