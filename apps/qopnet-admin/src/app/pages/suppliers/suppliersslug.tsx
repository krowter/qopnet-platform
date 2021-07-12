import useSWR from 'swr'

import { DefaultLayout } from '../../layouts'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Props = {
  children?: JSX.Element | JSX.Element[]
}
export const SuppliersSlugPage: React.FC<Props> = (props) => {
  const { data, error } = useSWR('/api/merchants', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading ...</div>
  return <DefaultLayout>{props.children}</DefaultLayout>
}
