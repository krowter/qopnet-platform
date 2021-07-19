import { Layout } from '@qopnet/qopnet-ui'

import { UploadImageForm } from '../../components'

export const UploadPage = () => {
  return (
    <Layout pt={10} meta={{ title: 'Upload images' }}>
      <UploadImageForm />
    </Layout>
  )
}

export default UploadPage
