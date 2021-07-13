import useSWR from 'swr'

import { DefaultLayout } from '../../layouts'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Props = {
  children?: JSX.Element | JSX.Element[]
}
export const SupplierSlugPage: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/merchants', fetcher)

  return (
    <DefaultLayout>
      {error && <div>Gagal memuat supplier</div>}
      {!error && !data && <div>Memuat supplier...</div>}
      {data && props.children}
    </DefaultLayout>
  )
}
