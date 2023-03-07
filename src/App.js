import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { UserContext } from 'contexts/user-context'
import { useAuth } from 'hooks/use-auth'
import firebase from 'config/firebase'
import posthog from 'posthog-js'

import PrivateRoute from 'routes/PrivateRoute'
import Login from 'pages/Login/Login'
import Fetch from 'components/Fetch'
import AlertBar from 'components/AlertBar'
import NotFound from 'pages/NotFound/NotFound'
import DialogContactForm from 'components/DialogContactForm'
import ViewStories from 'pages/ViewStories/ViewStories'
import ViewStory from 'pages/ViewStory/ViewStory'
import LayoutDrawerHeader from 'layouts/LayoutDrawerHeader'
import HeaderPublic from 'layouts/HeaderView'
import { useMediaQuery } from '@mui/material'
import NewRelease from 'pages/NewRelease/NewRelease'
import RestrictedPublicRoute from 'routes/RestrictedPublicRoute'
import Account from 'pages/Account/Account'
import Header from 'components/Header'

const { REACT_APP_POSTHOG_KEY } = process.env

const App = () => {
  const { user, logout, initializing } = useAuth()
  const matches = useMediaQuery('(min-width:1025px)')

  console.log(user)

  !!REACT_APP_POSTHOG_KEY &&
    posthog.init(REACT_APP_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
    })

  // !!REACT_APP_GA && ReactGA.initialize(REACT_APP_GA)

  firebase.analytics()

  return (
    <UserContext.Provider
      value={{ user: user, logout: logout, initializing: initializing }}
    >
      <Router>
        <Fetch />
        <AlertBar />
        <DialogContactForm />
        <Routes>
          <Route path="/" element={<PrivateRoute component={Outlet} />}>
            <Route path="/" element={<Navigate replace to="/releases" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/releases" element={<ViewStories />} />
            <Route path="/" element={<HeaderPublic />}>
              <Route path="/releases/:id" element={<ViewStory />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/try-it" element={<NewRelease requireVerification />} />
          <Route path="/" element={<Navigate replace to="/try-it" />} />
          <Route path="/login" element={<Login isLogin />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
