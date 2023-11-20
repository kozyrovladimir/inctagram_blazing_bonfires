import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import favoritesImage from '../../../shared/assets/icons/sideBar/favorites.svg'
import homeImage from '../../../shared/assets/icons/sideBar/home.svg'
import messengerImage from '../../../shared/assets/icons/sideBar/messenger.svg'
import myProfileImage from '../../../shared/assets/icons/sideBar/myProfile.svg'
import searchImage from '../../../shared/assets/icons/sideBar/search.svg'
import statisticsImage from '../../../shared/assets/icons/sideBar/statistics.svg'
import userListImage from '../../../shared/assets/icons/sideBar/user-list.svg'
import paymentsImage from '../../../shared/assets/icons/sideBar/payments.svg'
import postsImage from '../../../shared/assets/icons/sideBar/posts.svg'
import CreatePost from '@/features/create-post'
import {
  PROFILE_PATH,
  SUPER_ADMIN_PAYMENTS_LIST,
  SUPER_ADMIN_POSTS_LIST,
  SUPER_ADMIN_STATISTICS,
  SUPER_ADMIN_USERS_LIST,
} from '@/shared/constants/paths'

import style from './SideBar.module.scss'

import { Logout } from '@/features/logout/ui/logout/Logout'

export const SideBar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const mainPath = router.pathname.split('/')

  return (
    <aside className={style.sideBarContainer}>
      {mainPath[1] === 'super-admin' ? (
        <>
          <div className={style.linkWrapper} onClick={() => router.push(SUPER_ADMIN_USERS_LIST)}>
            <Image src={userListImage} alt={''} />
            {t('User list')}
          </div>
          <div className={style.linkWrapper} onClick={() => router.push(SUPER_ADMIN_STATISTICS)}>
            <Image src={statisticsImage} alt={''} />
            {t('Statistics')}
          </div>
          <div className={style.linkWrapper} onClick={() => router.push(SUPER_ADMIN_PAYMENTS_LIST)}>
            <Image src={paymentsImage} alt={''} />
            {t('Payments list')}
          </div>
          <div
            className={`${style.linkWrapper} ${style.linkWrapperLast}`}
            onClick={() => router.push(SUPER_ADMIN_POSTS_LIST)}
          >
            <Image src={postsImage} alt={''} />
            {t('Posts list')}
          </div>
        </>
      ) : (
        <>
          <div
            style={router.pathname === '/' ? { color: '#397DF6' } : {}}
            className={style.linkWrapper}
            onClick={() => router.push('/')}
          >
            <Image src={homeImage} alt={''} />
            {t('Home')}
          </div>
          <div className={style.linkWrapper}>
            {/*<Image src={createImage} alt={''} />*/}
            <CreatePost />
            {t('Create')}
          </div>
          <div
            style={router.pathname === PROFILE_PATH ? { color: '#397DF6' } : {}}
            className={style.linkWrapper}
            onClick={() => router.push(PROFILE_PATH)}
          >
            <Image src={myProfileImage} alt={''} />
            {t('MyProfile')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={messengerImage} alt={''} />
            {t('Messenger')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={searchImage} alt={''} />
            {t('Search')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={statisticsImage} alt={''} />
            {t('Statistics')}
          </div>
          <div className={style.linkWrapper}>
            <Image src={favoritesImage} alt={''} />
            {t('Favorites')}
          </div>
          <div className={style.linkWrapper}>
            <Logout />
          </div>
        </>
      )}
    </aside>
  )
}
