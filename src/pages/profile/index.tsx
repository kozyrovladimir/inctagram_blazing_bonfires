import { useState } from 'react'

import { useRouter } from 'next/router'

import { PostModal } from '@/features/profile-setting/ui/profilePostModal/PostModal'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

function Profile() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <Button size={ButtonSize.SMALL} onClick={() => router.push('profile/general-information')}>
        Profile Setting
      </Button>
      <Button size={ButtonSize.SMALL} onClick={openModal}>
        Create
      </Button>
      {open && <PostModal closeWindow={() => setOpen(false)} />}
    </>
  )
}

Profile.getLayout = getLayout
export default Profile
