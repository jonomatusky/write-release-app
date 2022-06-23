import React from 'react'
import PanelBullets from '../PanelBullets/PanelBullets'
import useSession from 'hooks/use-session'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Grid } from '@mui/material'

const PanelPoints = ({ id }) => {
  const { user } = useSession()
  const { select } = useIndividualsStore()
  const individual = select(id)
  const points = (individual || {}).points || []

  let title = 'Talking Points'

  return (
    <>
      {(!!user || (points || []).length > 0) && (
        <Grid item xs={12}>
          <PanelBullets title={title} bullets={points} field="points" />
        </Grid>
      )}
    </>
  )
}

export default PanelPoints
