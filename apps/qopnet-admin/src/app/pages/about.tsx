import { Link } from 'react-router-dom'

import { DefaultLayout } from '../layouts'

export const About = () => {
  return (
    <DefaultLayout>
      <h1>About</h1>
      <div>
        <h1>This is a about page</h1>
        <Link to="/">Home</Link>
      </div>
    </DefaultLayout>
  )
}
