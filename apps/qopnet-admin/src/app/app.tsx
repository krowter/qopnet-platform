import { Route } from 'react-router-dom'

import { Profiles, Home, About, Login } from './pages'

export function App() {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/profiles" exact component={Profiles} />
      <Route path="/about" exact component={About} />
      <Route path="/login" exact component={Login} />
    </>
  )
}

export default App
