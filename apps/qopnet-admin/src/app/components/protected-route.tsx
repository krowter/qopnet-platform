import { useEffect } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'

export type ProtectedRouteProps = {
  isAuthenticated: boolean
} & RouteProps

export const ProtectedRoute = ({
  isAuthenticated,
  path,
  ...routeProps
}: ProtectedRouteProps) => {
  const history = useHistory()

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      history.replace('/login')
    }
  }, [isAuthenticated, history])

  // Extra safety to redirect if not authenticated
  if (!isAuthenticated) {
    return <Redirect to="/login" />
  } else {
    return <Route {...routeProps} />
  }
}
