import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { Logout } from '../../features/logout/ui/Logout/Logout'
import createImage from '../../shared/assets/icons/sideBar/create.svg'
import favoritesImage from '../../shared/assets/icons/sideBar/favorites.svg'
import homeImage from '../../shared/assets/icons/sideBar/home.svg'
import messengerImage from '../../shared/assets/icons/sideBar/messenger.svg'
import myProfileImage from '../../shared/assets/icons/sideBar/myProfile.svg'
import searchImage from '../../shared/assets/icons/sideBar/search.svg'
import statisticsImage from '../../shared/assets/icons/sideBar/statistics.svg'

import style from './SideBar.module.scss'

export const SideBar = () => {
  const router = useRouter()

  return (
    <div className={style.sideBarContainer}>
      <div
        style={router.pathname === '/' ? { color: '#397DF6' } : {}}
        className={style.linkWrapper}
        onClick={() => router.push('/')}
      >
        <Image src={homeImage} alt={''} />
        Home
      </div>
      <div className={style.linkWrapper}>
        <Image src={createImage} alt={''} />
        Create
      </div>
      <div
        style={router.pathname === '/profile' ? { color: '#397DF6' } : {}}
        className={style.linkWrapper}
        onClick={() => router.push('/profile')}
      >
        <Image src={myProfileImage} alt={''} />
        My Profile
      </div>
      <div className={style.linkWrapper}>
        <Image src={messengerImage} alt={''} />
        Messenger
      </div>
      <div className={style.linkWrapper}>
        <Image src={searchImage} alt={''} />
        Search
      </div>
      <div className={style.linkWrapper}>
        <Image src={statisticsImage} alt={''} />
        Statistics
      </div>
      <div className={style.linkWrapper}>
        <Image src={favoritesImage} alt={''} />
        Favorites
      </div>
      <div className={style.linkWrapper}>
        <Logout />
      </div>
    </div>
  )
}
