/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express'
import * as cors from 'cors'
import * as logger from 'morgan'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to Qopnet API!' })
})

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from Qopnet API!' })
})

app.get('/graphql', (req, res) => {
  res.send({ message: 'The GraphQL API is not ready yet.' })
})

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log(`qopnet-api listening at host:${port}/api`)
})

server.on('error', console.error)
