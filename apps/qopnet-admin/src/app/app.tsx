import { Route, Link } from 'react-router-dom'

import { Profiles, Home, About } from './pages'

export function App() {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/profiles" exact component={Profiles} />
      <Route path="/about" exact component={About} />
    </>
  )
}

export default App
