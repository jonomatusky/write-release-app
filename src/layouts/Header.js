import React from 'react'
import {
  Outlet,
  // Link, useParams, useLocation
} from 'react-router-dom'
// import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Toolbar } from '@mui/material'
// import { ContentCopy } from '@mui/icons-material'
// import { Box } from '@mui/system'
// import ButtonCopy from 'components/ButtonCopy'
// import { useSession } from 'hooks/use-session'
import ScrollToTop from 'components/ScrollToTop'
// import ButtonReportBug from 'components/ButtonReportBug'
// import useIndividualsStore from 'hooks/store/use-individuals-store'
// import useInquiriesStore from 'hooks/store/use-inquiries-store'

// const { REACT_APP_PUBLIC_URL } = process.env

const Header = () => {
  // const { logout } = useSession()
  // const { id } = useParams()
  // const { select } = useIndividualsStore()
  // const individual = select(id)

  // const location = useLocation()
  // const { pathname } = location

  // const { setEntity } = useInquiriesStore()
  // const handleContact = () => {
  //   setEntity({
  //     entityType: 'individual',
  //     entityId: id,
  //   })
  // }

  return (
    <>
      <ScrollToTop />

      <main>
        <Toolbar variant="dense" />
        <Outlet />
      </main>
    </>
  )
}

export default Header
