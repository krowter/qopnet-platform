import { setupWorker, rest } from 'msw'

const myResourceHandler = rest.get('/api/users', (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json([
      {
        email: 'test@gmail.com',
        profile: {
          handle: 'test',
          name: 'test',
          avatarUrl: '',
          phone: '08123456789',
          userId: '211182da-c301-4fe9-8801-6225adacb0df',
          address: {
            street: '',
            streetDetails: '',
            city: '',
            state: '',
            zip: '',
            countryCode: '',
          },
        },
      },
      {
        email: 'arya@gmail.com',
        profile: {
          handle: 'arya',
          name: 'arya',
          avatarUrl: '',
          phone: '08123456799',
          userId: '211182da-c301-4fe9-8801-6225adacb0dg',
          address: {
            street: '',
            streetDetails: '',
            city: '',
            state: '',
            zip: '',
            countryCode: '',
          },
        },
      },
    ])
  )
)

const worker = setupWorker(myResourceHandler)

worker.start()
