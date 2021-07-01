import { Route, useHistory } from 'react-router-dom'
import { useUser } from 'use-supabase'

import { Profiles, Home, About, Login } from './pages'
import { useEffect } from 'react'

export const App = () => {
  const user = useUser()
  const history = useHistory()

  const isAuthenticated = !!user

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      history.replace('/login')
    }
  }, [isAuthenticated, history])

  if (user) {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles" component={Profiles} />
      </>
    )
  } else {
    return (
      <>
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
      </>
    )
  }
}

export default App
