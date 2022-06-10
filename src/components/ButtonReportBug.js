import React from 'react'
import { Fab } from '@mui/material'
import { BugReport } from '@mui/icons-material'
import useSession from 'hooks/use-session'

const ButtonReportBug = () => {
  const { user } = useSession()

  return !!user ? (
    <Fab
      color="secondary"
      sx={{ position: 'fixed', zIndex: '100', bottom: 24, left: 24 }}
      target="_blank"
      href="https://airtable.com/shrgP0cjfUzl2lSHS"
      alt="Report a Bug"
    >
      <BugReport />
    </Fab>
  ) : (
    <></>
  )
}

export default ButtonReportBug
