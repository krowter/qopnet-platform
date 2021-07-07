import * as express from 'express'
import * as cors from 'cors'
import * as logger from 'morgan'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import root from './app/root'
import auth from './app/auth'
import profiles from './app/profiles'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

// Sentry error tracking and reporting
Sentry.init({
  environment: process.env.NODE_ENV || 'production',
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

app.use('/', root)
app.use('/api/auth', auth)
app.use('/api/profiles', profiles)

// The error handler must be before any other error middleware
// and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log(`qopnet-api listening at :${port}/api`)
})

server.on('error', console.error)
