import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <h1>This is a home page</h1>
        <Link to="/about">About</Link>
      </div>
    </div>
  )
}
