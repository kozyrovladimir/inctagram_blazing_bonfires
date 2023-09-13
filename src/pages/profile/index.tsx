import { FC } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import noImage from '../../shared/assets/icons/avatarProfile/notPhoto.png'
import { getLayout } from '../../shared/layouts/MainLayout/MainLayout'
import { Button } from '../../shared/ui/Button/Button'

import style from './profile.module.scss'

function Profile() {
  const router = useRouter()

  return (
    <div className={style.rootContainer}>
      <div className={style.headerContainer}>
        <div className={style.avatarContainer}>
          <Image src={noImage} alt={'avatar'} width={48} height={48} />
        </div>
        <div className={style.profileInfoContainer}>
          <div className={style.profileTitleContainer}>
            <div>URLProfile</div>
            <Button
              className={style.buttonProfileSetting}
              onClick={() => router.push('profile/general-information')}
            >
              Profile Setting{' '}
            </Button>
          </div>
          <div className={style.subscribersContainer}>
            <div>
              <span className={style.countSubscribers}>2128</span> <br /> Following
            </div>
            <div>
              <span className={style.countSubscribers}>2128</span> <br /> Followers
            </div>
            <div>
              <span className={style.countSubscribers}>2128</span> <br /> Publications
            </div>
          </div>
          <div className={style.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
      <div className={style.photosContainer}>
        {testPhotos.map((photo, i) => (
          <Pictures key={i} url={photo} />
        ))}
      </div>
    </div>
  )
}

const testPhotos: string[] = [
  noImage.src,
  noImage.src,
  noImage.src,
  noImage.src,
  noImage.src,
  noImage.src,
  noImage.src,
  noImage.src,
]

type PicturesProps = {
  url: string
}
const Pictures: FC<PicturesProps> = ({ url }) => {
  return (
    <div className={style.photoWrapper}>
      <Image src={url} alt={'photo'} width={234} height={228} />
    </div>
  )
}

Profile.getLayout = getLayout
export default Profile
