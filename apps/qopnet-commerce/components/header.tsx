import { Header as QopnetUIHeader } from '@qopnet/qopnet-ui'

import { useSWR } from '../utils'

export const Header = () => {
  const { data, error } = useSWR('/api/business/orders/my/cart')
  const { businessOrder } = data || {}

  const cart = {
    ...businessOrder,
    totalItemsCount:
      businessOrder?.totalItems ||
      businessOrder?.businessOrderItems?.length ||
      0,
  }

  return <QopnetUIHeader cart={cart} />
}

export default Header
