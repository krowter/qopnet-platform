import * as express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    message: 'This is the root of qopnet-api',
    environment: process.env.NODE_ENV,
  })
})

router.get('/graphql', (req, res) => {
  res.send({
    message: 'The GraphQL API is not ready yet.',
  })
})

router.get('/api', (req, res) => {
  res.send({ message: 'Welcome to Qopnet API!' })
})

router.get('/api/hello', (req, res) => {
  res.send({
    message: 'Hello from Qopnet API!',
  })
})

export default router
