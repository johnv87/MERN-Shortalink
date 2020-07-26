import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import 'materialize-css'

//  In order to make requests to backend
//  define proxy in client/package.json

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  //  Provide boolean value
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if (!ready) {
    //  Prevent redirect to default 'create' page while data is loading
    return <Loader />
  }

  return (
    //  Provide CONTEXT via full application
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
