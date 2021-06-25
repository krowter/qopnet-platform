import { Route, Link } from 'react-router-dom'

import { Header } from './components'

export function App() {
  return (
    <>
      <Header />

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Route
        path="/"
        exact
        render={() => (
          <div>
            <h1>This is a home page</h1>
            <Link to="/about">About</Link>
          </div>
        )}
      />
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
