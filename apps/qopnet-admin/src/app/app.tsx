import { Route, Switch, useHistory } from 'react-router-dom'
import { useUser, useSupabase } from 'use-supabase'

import { Profiles, Home, About, Login, NotFound } from './pages'
import { useEffect } from 'react'

export const App = () => {
  const user = useUser()
  const history = useHistory()
  const { auth } = useSupabase()

  useEffect(() => {
    const checkSession = async () => {
      const session = await auth.session()
      // Redirect to login page if not authenticated / no session
      if (!session) {
        history.replace('/login')
      }
    }
    checkSession()
  }, [auth, history])

  if (user) {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
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
