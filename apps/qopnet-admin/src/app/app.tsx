import { Route, Switch, useHistory } from 'react-router-dom'
import { useUser } from 'use-supabase'

import { Profiles, Home, About, Login, NotFound } from './pages'
import { useEffect } from 'react'

export const App = () => {
  const user = useUser()
  const history = useHistory()

  const isAuthenticated = !!user

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      history.replace('/login')
    } else {
      history.replace('/')
    }
  }, [isAuthenticated, history])

  if (user) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/profiles" component={Profiles} />
        <Route component={NotFound} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
      </Switch>
    )
  }
}

export default App
