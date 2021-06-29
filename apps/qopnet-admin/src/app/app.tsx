import { Route, Link } from 'react-router-dom'

import { Header } from './components'
import { Profiles, Home } from './pages'

export function App() {
  return (
    <>
      <Header />

      <Route path="/" exact component={Home} />

      <Route path="/profiles" exact component={Profiles} />

      <Route
        path="/about"
        exact
        render={() => (
          <div>
            <Link to="/">Back to home page</Link>
          </div>
        )}
      />
    </>
  )
}

export default App
