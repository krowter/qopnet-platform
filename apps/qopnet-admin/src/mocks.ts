import { setupWorker, rest } from 'msw'

const myResourceHandler = [
  rest.get('/api/users', (req, res, ctx) =>
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
          },
        },
      ])
    )
  ),
  rest.get('/api/suppliers', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          handle: 'qoperasi',
          name: 'PT Qoperasi Kita',
          avatarUrl: '',
          nationalTax: '01354876545',
          certificationFile: '',
        },
        {
          handle: 'thalia',
          name: 'THALIA Supplier',
          avatarUrl: '',
          nationalTax: '2154978564',
          certificationFile: '',
        },
      ])
    )
  ),
  rest.get('/api/merchants', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          handle: 'rkub',
          name: 'Rumah Kreasi Usaha Bersama',
        },
        {
          handle: 'suka-makmur',
          name: 'Toko Suka Makmur',
        },
      ])
    )
  ),
]

const worker = setupWorker(...myResourceHandler)

worker.start()
