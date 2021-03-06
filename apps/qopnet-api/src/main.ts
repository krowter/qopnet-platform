import * as express from 'express'
import * as cors from 'cors'
import * as logger from 'morgan'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import root from './app/root'
import images from './app/images'
import auth from './app/auth'
import users from './app/users'
import profiles from './app/profiles'
import addresses from './app/addresses'
import suppliers from './app/suppliers'
import supplierProducts from './app/suppliers/products'
import merchants from './app/merchants'
import businessOrders from './app/business/orders'
import couriers from './app/couriers'
import courierVehicles from './app/couriers/vehicles'
import paymentMethods from './app/payments/methods'
import paymentRecords from './app/payments/records'
import promoEmployees from './app/promos/employees'
import promoSubmissions from './app/promos/submissions'
import paymentsVA from './app/payments/va'

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

// The API endpoints
// Priority order is very important
app.use('/', root)
app.use('/images', images)
app.use('/auth', auth)
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/addresses', addresses)
app.use('/api/suppliers/products', supplierProducts)
app.use('/api/suppliers', suppliers)
app.use('/api/merchants', merchants)
app.use('/api/business/orders', businessOrders)
app.use('/api/couriers', couriers)
app.use('/api/couriers/vehicles', courierVehicles)
app.use('/api/payments/methods', paymentMethods)
app.use('/api/payments/records', paymentRecords)
app.use('/api/payments/va', paymentsVA)
app.use('/api/promos/employees', promoEmployees)
app.use('/api/promos/submissions', promoSubmissions)

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
  console.info({
    message: `Qopnet API listening at :${port}`,
    env: process.env.NODE_ENV,
    databaseUrl: process.env.PRISMA_DATABASE_URL,
  })
})

server.on('error', console.error)
