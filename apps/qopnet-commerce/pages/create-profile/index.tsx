import { Layout, Icon } from '@qopnet/qopnet-ui'
import { CreateProfileForm } from '../../components'

export const createProfilePage = () => {
  // Should get from /api/profiles/my
  const currentProfile = {}

  return (
    <Layout>
      <CreateProfileForm currentProfile={currentProfile} />
    </Layout>
  )
}

export default createProfilePage
