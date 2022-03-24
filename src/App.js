import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom'
import ViewProfile from './pages/ViewProfile/ViewProfile'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/:id" element={<ViewProfile />} />
          <Route path="/admin" element={<h1>admin</h1>}>
            <Route path="/admin/:id" element={<ViewProfile />} />
            <Route path="/admin/:id/edit" element={<h2>admin shmoe edit</h2>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
