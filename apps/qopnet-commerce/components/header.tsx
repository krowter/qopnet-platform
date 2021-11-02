import { Header as QopnetUIHeader } from '@qopnet/qopnet-ui'
import { useUser } from 'use-supabase'

import { useSWR } from '../utils'

export const Header = () => {
  const user = useUser()
  const isLoggedIn = Boolean(user)

  const { data, error } = useSWR(
    isLoggedIn ? '/api/business/orders/my/cart' : null
  )

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
