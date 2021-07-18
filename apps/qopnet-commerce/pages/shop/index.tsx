import { Layout } from '@qopnet/qopnet-ui'

import { ShopProducts } from '../../components/products'

export const shopPage = () => {
  return (
    <Layout
      meta={{
        title: 'Belanja produk supplier - Qopnet',
        description:
          'Lihat katalog semua produk supplier yang tersedia di Qopnet.',
      }}
    >
      <ShopProducts />
    </Layout>
  )
}

export default shopPage
