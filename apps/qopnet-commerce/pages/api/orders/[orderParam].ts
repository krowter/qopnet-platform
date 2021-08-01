import orderExample from './order-example.json'

export default function apiOrders(req, res) {
  if (req.method === 'GET') {
    getOneOrder(req, res)
  } else {
    res.status(400).send({
      message: 'Not available',
    })
  }
}

export const getOneOrder = (req, res) => {
  const { orderParam } = req.query

  res.send({
    message: 'Get one order success',
    orderParam,
    order: orderExample,
  })
}
