import { useRouter } from 'next/router'

import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

function Profile() {
  const router = useRouter()

  return (
    <Button size={ButtonSize.SMALL} onClick={() => router.push('profile/general-information')}>
      Profile Setting{' '}
    </Button>
  )
}

Profile.getLayout = getLayout
export default Profile
