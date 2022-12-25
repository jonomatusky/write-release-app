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
import ViewCompanies from 'pages/ViewCompanies/ViewCompanies'
import ViewCompany from 'pages/ViewCompany/ViewCompany'
import ViewStories from 'pages/ViewStories/ViewStories'
import ViewStory from 'pages/ViewStory/ViewStory'
import ViewContents from 'pages/ViewContents/ViewContents'
import ViewContent from 'pages/ViewContent/ViewContent'
import EditorTest from 'pages/EditorTest'
import LayoutDrawerHeader from 'layouts/LayoutDrawerHeader'
import HeaderView from 'layouts/HeaderView'
import BetaRoute from 'routes/BetaRoute'
import ViewCampaigns from 'pages/ViewCampaigns/ViewCampaigns'
import ViewCampaign from 'pages/ViewCampaign/ViewCampaign'

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
          {/* <Route path="/" element={<Header />}> */}

          <Route path="/" element={<LayoutDrawerHeader />}>
            <Route path="/" element={<HeaderView copy />}>
              <Route path="/profiles/:id" element={<ViewProfile />} />
              <Route path="/companies/:id" element={<ViewCompany />} />
              <Route path="/" element={<Navigate replace to="/profiles" />} />
            </Route>
            <Route path="/" element={<HeaderView />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<BetaRoute component={Outlet} />}>
                <Route path="/stories/:id" element={<ViewStory />} />
                <Route path="/content/:id" element={<ViewContent />} />
                <Route path="/social/:id" element={<ViewCampaign />} />
              </Route>
            </Route>
          </Route>
          <Route path="/" element={<LayoutDrawerHeader open />}>
            <Route path="/" element={<PrivateRoute component={Outlet} />}>
              <Route path="/profiles" element={<ViewProfiles />} />
              <Route path="/companies" element={<ViewCompanies />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<BetaRoute component={Outlet} />}>
                <Route path="/content" element={<ViewContents />} />
                <Route path="/stories" element={<ViewStories />} />
                <Route path="/social" element={<ViewCampaigns />} />
              </Route>
            </Route>
          </Route>
          {/* <Route path="/" element={<HeaderAlt />}></Route> */}
          <Route path="/editor-test" element={<EditorTest />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
