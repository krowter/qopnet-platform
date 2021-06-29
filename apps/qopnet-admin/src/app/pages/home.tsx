import { Link } from 'react-router-dom'
import { DefaultLayout } from '../layouts'

export const Home = () => {
  return (
    <DefaultLayout>
      <h1>Home</h1>
      <div>
        <h1>This is a home page</h1>
        <Link to="/about">About</Link>
      </div>
    </DefaultLayout>
  )
}
