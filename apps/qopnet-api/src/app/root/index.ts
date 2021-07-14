import * as packageData from '../../../../../package.json'
import * as express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    message: 'This is the root of qopnet-api',
    environment: `${process.env.NX_NODE_ENV || process.env.NODE_ENV}`,
    version: `${packageData.version}`,
    supabase: {
      url: `${process.env.NX_SUPABASE_URL}`,
      anon: `${process.env.NX_SUPABASE_ANON_KEY}`,
    },
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

router.get('/api/stats', (req, res) => {
  res.send({
    message: 'Get all stats',
  })
})

export default router
