import { useRouter } from 'next/router'

import { Layout } from '@qopnet/qopnet-ui'

const searchPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const { q: keyword } = router.query

  return (
    <Layout>
      <h1>Cari produk dan toko supplier</h1>
      <p>Kata kunci: {keyword}</p>
    </Layout>
  )
}

export default searchPage
