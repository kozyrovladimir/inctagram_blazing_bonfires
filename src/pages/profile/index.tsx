import { useRouter } from 'next/router'

import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'

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
