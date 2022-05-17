import useSession from 'hooks/use-session'
import React from 'react'
import PanelBullets from '../PanelBullets/PanelBullets'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import { Grid } from '@mui/material'

const PanelFacts = ({ id }) => {
  const { user } = useSession()
  const { select } = useIndividualsStore()
  const individual = select(id)
  const facts = (individual || {}).facts || []

  let title = 'Fast Facts'

  const placeholders = [
    `Founded her first lemonade stand at age 14 on her parent's front lawn`,
    'Graduated from the school of hard knocks with a minor in street smarts',
    'Previously the head of Roadrunner deterrents at Acme Inc.',
    'Fights Crime as Batman in his spare time',
    'Contributing author of "Funny Fake Bullets" at Joxios',
  ]

  return (
    <>
      {(!!user || (facts || []).length > 0) && (
        <Grid item xs={12}>
          <PanelBullets
            title={title}
            bullets={facts}
            field="facts"
            placeholders={placeholders}
          />
        </Grid>
      )}
    </>
  )
}

export default PanelFacts
