import { DefaultLayout } from '../../layouts'
import { useSWR } from '../../utils/swr'

type Props = {
  children?: JSX.Element | JSX.Element[]
}
export const SupplierSlugPage: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/merchants')

  return (
    <DefaultLayout>
      {error && <div>Gagal memuat supplier</div>}
      {!error && !data && <div>Memuat supplier...</div>}
      {data && props.children}
    </DefaultLayout>
  )
}
