import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import createImage from '../../../shared/assets/icons/sideBar/create.svg'
import favoritesImage from '../../../shared/assets/icons/sideBar/favorites.svg'
import homeImage from '../../../shared/assets/icons/sideBar/home.svg'
import messengerImage from '../../../shared/assets/icons/sideBar/messenger.svg'
import myProfileImage from '../../../shared/assets/icons/sideBar/myProfile.svg'
import searchImage from '../../../shared/assets/icons/sideBar/search.svg'
import statisticsImage from '../../../shared/assets/icons/sideBar/statistics.svg'

import style from './SideBar.module.scss'

import { Logout } from '@/features/logout/ui/logout/Logout'
import CreatePost from '@/features/create-post'

export const SideBar = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <aside className={style.sideBarContainer}>
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
        style={router.pathname === '/profile' ? { color: '#397DF6' } : {}}
        className={style.linkWrapper}
        onClick={() => router.push('/profile')}
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
    </aside>
  )
}
