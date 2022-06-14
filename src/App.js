import Header from 'layouts/Header'
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
import ViewProfiles from 'pages/ViewProfiles/ViewProfiles'
import ViewProfile from './pages/ViewProfile/ViewProfile'
import Login from 'pages/Login/Login'
import Fetch from 'components/Fetch'
import AlertBar from 'components/AlertBar'
import NotFound from 'pages/NotFound/NotFound'
import DialogContactForm from 'components/DialogContactForm'

const { REACT_APP_POSTHOG_KEY } = process.env

const App = () => {
  const { user, logout, initializing } = useAuth()

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
          <Route path="/" element={<Header />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profiles/:pid" element={<ViewProfile />} />
            <Route path="/" element={<Navigate replace to="/profiles" />} />
            <Route path="/" element={<PrivateRoute component={Outlet} />}>
              <Route path="/profiles" element={<ViewProfiles />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
