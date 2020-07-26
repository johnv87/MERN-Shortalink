import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import AuthPage from './pages/AuthPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'

export const useRoutes = isAuthenticated => {
  //  If user is authenticated show available list of pages
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/links' component={LinksPage} />
        <Route exact path='/create' component={CreatePage} />
        <Route path='/detail/:id' component={DetailPage} />
        <Redirect to='/create' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/' component={AuthPage} />
      <Redirect to='/' />
    </Switch>
  )
}
