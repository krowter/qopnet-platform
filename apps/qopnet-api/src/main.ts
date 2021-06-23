import * as express from 'express'
import * as cors from 'cors'
import * as logger from 'morgan'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }), // HTTP calls tracing
    new Tracing.Integrations.Express({ app }), // Express.js middleware tracing
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

// RequestHandler creates a separate execution context using domains,
// so that every transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.get('/', (req, res) => {
  res.send({ message: 'This is the root of qopnet-api' })
})

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to Qopnet API!' })
})

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from Qopnet API!' })
})

app.get('/graphql', (req, res) => {
  res.send({ message: 'The GraphQL API is not ready yet.' })
})

// The error handler must be before any other error middleware
// and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log(`qopnet-api listening at host:${port}/api`)
})

server.on('error', console.error)
