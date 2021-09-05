import { Header as QopnetUIHeader } from '@qopnet/qopnet-ui'

export const Header = () => {
  const cart = {
    totalItemsCount: 0,
  }

  return <QopnetUIHeader cart={cart} />
}

export default Header
