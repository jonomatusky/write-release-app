import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'components/Header'

const HeaderPublic = ({ open, copy }) => {
  return (
    <>
      <Header showTryItButton logoHref="https://www.writerelease.com" />
      <Outlet />
    </>
  )
}

export default HeaderPublic
