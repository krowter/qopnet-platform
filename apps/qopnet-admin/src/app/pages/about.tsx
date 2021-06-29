import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <div>
      <h1>About</h1>
      <div>
        <h1>This is a about page</h1>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}
