import useSession from 'hooks/use-session'
import React from 'react'
import PanelBullets from '../PanelBullets/PanelBullets'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import { Grid } from '@mui/material'

const PanelFacts = ({ id }) => {
  const { user } = useSession()
  const { select } = useOrganizationsStore()
  const organization = select(id)
  const facts = (organization || {}).facts || []

  let title = 'Fast Facts'

  const placeholders = [
    `Leading provider of wigets and doodads on the east coast`,
    'Diverse team of expenienced executives with expertise in industry, business, and the business of industry',
    'Founded in 1985 by Dr. Emmett Brown in his makeshift laboratory/garage',
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
