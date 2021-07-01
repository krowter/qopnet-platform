import { Route } from 'react-router-dom'
import { useUser } from 'use-supabase'

import { Profiles, Home, About, Login } from './pages'
import { ProtectedRoute, ProtectedRouteProps } from './components'

export function App() {
  const user = useUser()

  const protectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!user,
  }

  return (
    <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
      <ProtectedRoute
        {...protectedRouteProps}
        exact
        path="/"
        component={Home}
      />
      <ProtectedRoute
        {...protectedRouteProps}
        exact
        path="/profiles"
        component={Profiles}
      />
    </>
  )
}

export default App
