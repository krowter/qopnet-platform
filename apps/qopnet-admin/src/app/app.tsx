import { Route, Switch, useHistory } from 'react-router-dom'
import { useUser, useSupabase } from 'use-supabase'

import {
  Profiles,
  HomePage,
  AboutPage,
  UsersPage,
  SuppliersPage,
  MerchantsPage,
  SignInPage,
  NotFoundPage,
} from './pages'
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
        history.replace('/signin')
      }
    }
    checkSession()
  }, [auth, history])

  if (user) {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/suppliers" component={SuppliersPage} />
        <Route exact path="/merchants" component={MerchantsPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/profiles" component={Profiles} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/about" component={AboutPage} />
      </Switch>
    )
  }
}

export default App
