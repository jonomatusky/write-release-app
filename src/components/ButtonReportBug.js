import React, { useState } from 'react'
import { Fab, Box, Collapse } from '@mui/material'
import { PestControl } from '@mui/icons-material'
import useSession from 'hooks/use-session'

const ButtonReportBug = () => {
  const { user } = useSession()
  const [show, setShow] = useState(false)

  return !!user ? (
    <Box
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      sx={{
        position: 'fixed',
        zIndex: '100',
        bottom: 24,
        left: 24,
      }}
    >
      <Fab
        size="large"
        color="secondary"
        sx={{
          pr: 1.5,
          pl: 1.5,
          // maxWidth: show ? null : '48px',
        }}
        target="_blank"
        href="https://airtable.com/shrgP0cjfUzl2lSHS"
        alt="Report a Bug"
        variant="extended"
      >
        <PestControl />
        <Collapse orientation="horizontal" in={show}>
          <Box overflow="hidden" sx={{ ml: 1, pr: 0.5 }} whiteSpace="nowrap">
            Report a Bug
          </Box>
        </Collapse>
      </Fab>
    </Box>
  ) : (
    <></>
  )
}

export default ButtonReportBug
