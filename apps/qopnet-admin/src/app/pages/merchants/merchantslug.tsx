import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

type Props = {
  children?: JSX.Element | JSX.Element[]
}

export const MerchantSlugPage: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/merchants')

  return (
    <DefaultLayout>
      {error && <div>Gagal memuat merchant</div>}
      {!error && !data && <div>Memuat merchant...</div>}
      {data && props.children}
    </DefaultLayout>
  )
}
