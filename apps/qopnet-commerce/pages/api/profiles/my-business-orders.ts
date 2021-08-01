import myBusinessOrdersExample from './my-business-orders-example.json'

export default function apiProfiles(req, res) {
  if (req.method === 'GET') {
    getMyBusinessOrders(req, res)
  } else {
    res.status(400).send({
      message: 'Not available',
    })
  }
}

// Temporary
// GET /api/profiles/my-business-orders
export const getMyBusinessOrders = (req, res) => {
  res.send({
    message: 'Get my business orders success',
    query: req.query,
    orders: myBusinessOrdersExample,
  })
}
