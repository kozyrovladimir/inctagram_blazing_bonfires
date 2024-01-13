import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import style from './PublicProfile.module.scss'

import s from '@/entities/publicPost/ui/PublicPost.module.scss'
import { PublicProfileType } from '@/shared/api/services/public/public.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { UseGetShowHideText } from '@/shared/hooks'

type PropsType = {
  data: PublicProfileType
}

export const PublicProfile = (props: PropsType) => {
  const { userName, aboutMe, avatars } = props.data

  const { t } = useTranslation('common', { keyPrefix: 'Profile' })

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, fullText } = UseGetShowHideText(
    aboutMe,
    150
  )

  return (
    <div className={style.publicProfileContainer}>
      <div className={style.avatarContainer}>
        <Image
          src={avatars ? avatars[0]?.url : noImage}
          alt={'avatar'}
          width={204}
          height={204}
          className={style.avatar}
          priority
        />
      </div>

      <div className={style.profileInfoContainer}>
        <div className={style.profileTitleContainer}>
          <h1 className={style.titleUserName}>{userName}</h1>

          <div className={style.subscribersContainer}>
            <div className={style.itemSubscribers}>
              <span className={style.countSubscribers}>2128</span>

              <p>{t('Following')}</p>
            </div>
            <div className={style.itemSubscribers}>
              <span className={style.countSubscribers}>2128</span>

              <p>{t('Followers')}</p>
            </div>
            <div className={style.itemSubscribers}>
              <span className={style.countSubscribers}>2128</span>

              <p>{t('Publications')}</p>
            </div>
          </div>
          <p className={style.aboutMeInformation}>
            {aboutMe ? fullText : <></>}
            {displayShowMore && (
              <span onClick={() => setIsShowMoreActive(!isShowMoreActive)} className={s.showMore}>
                {isShowMoreActive ? 'Hide' : 'Show more'}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
