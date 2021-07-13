import useSWR from 'swr'

import { DefaultLayout } from '../../layouts'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Props = {
  children?: JSX.Element | JSX.Element[]
}
export const MerchantSlugPage: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/merchants', fetcher)

  return (
    <DefaultLayout>
      {error && <div>Gagal memuat merchant</div>}
      {!error && !data && <div>Memuat merchant...</div>}
      {data && props.children}
    </DefaultLayout>
  )
}
