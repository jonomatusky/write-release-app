import Header from 'layouts/Header'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom'

import firebase from 'config/firebase'
import ViewProfile from './pages/ViewProfile/ViewProfile'

const App = () => {
  firebase.analytics()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/:id" element={<ViewProfile />} />
          <Route path="/admin" element={<Outlet />}>
            <Route path="/admin/:id" element={<ViewProfile />} />
            {/* <Route path="/admin/:id/edit" element={<EditProfile />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
