import { FC } from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import noImage from '../../shared/assets/icons/avatarProfile/notPhoto.png'

import style from './profile.module.scss'

import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { ShortLangs } from '@/shared/types/langSwitcherTypes'
import { Button } from '@/shared/ui/button/Button'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function Profile() {
  const {
    t,
    i18n: { t: tRoot, language },
  } = useTranslation('common', { keyPrefix: 'Profile' })
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
              style={language === ShortLangs.RU ? { fontSize: '0.875rem' } : undefined}
              onClick={() => router.push(`profile/general-information`)}
            >
              {tRoot('ProfileSetting')}
            </Button>
          </div>
          <div className={style.subscribersContainer}>
            <div>
              <span className={style.countSubscribers}>2128</span> <br /> {t('Following')}
            </div>
            <div>
              <span className={style.countSubscribers}>2128</span> <br /> {t('Followers')}
            </div>
            <div>
              <span className={style.countSubscribers}>2128</span> <br /> {t('Publications')}
            </div>
          </div>
        </div>
        <div className={style.photosContainer}>
          {/* {testPhotos.map((photo, i) => (
            <Pictures key={i} url={photo} />
          ))} */}
        </div>
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

type PostsProps = {
  url: string
}
const Posts: FC<PostsProps> = ({ url }) => {
  return (
    <div className={style.photoWrapper}>
      <Link href={`/profile/post`}>
        <Image src={url} alt={'photo'} width={234} height={228} />
      </Link>
    </div>
  )
}

Profile.getLayout = getLayout
export default Profile
