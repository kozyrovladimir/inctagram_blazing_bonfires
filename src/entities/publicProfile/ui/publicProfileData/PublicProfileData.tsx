import React from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import style from './PublicProfileData.module.scss'

import { PublicProfileType } from '@/shared/api/services/public/public.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { UseGetShowHideText } from '@/shared/hooks'

type PropsType = {
  data: PublicProfileType
  amountPost: number
}

export const PublicProfileData = (props: PropsType) => {
  const {
    data: { userName, aboutMe, avatars },
    amountPost,
  } = props
  const { t } = useTranslation('common', { keyPrefix: 'Profile' })

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, fullText } = UseGetShowHideText(
    aboutMe,
    150
  )

  const notImageClass = clsx(style.avatar, !avatars[0] && style.notAvatar)

  return (
    <div className={style.profileContainer}>
      <div className={style.avatarContainer}>
        <Image
          src={avatars[0]?.url ?? noImage}
          alt={'avatar'}
          width={204}
          height={204}
          className={notImageClass}
          priority
        />
        <h1 className={style.userNameResponsive}>{userName}</h1>
      </div>

      <div className={style.profileInfoContainer}>
        <div className={style.profileTitleContainer}>
          <h1 className={style.titleUserName}>{userName}</h1>

          <div className={style.subscribersContainer}>
            <div className={style.item}>
              <span>{2128}</span> {/*todo amount following */}
              <p>{t('Following')}</p>
            </div>
            <div className={style.item}>
              <span>{2128}</span> {/*todo amount followers */}
              <p>{t('Followers')}</p>
            </div>
            <div className={style.item}>
              <span>{amountPost}</span>
              <p>{t('Publications')}</p>
            </div>
          </div>
          <p className={style.aboutMeInformation}>
            {aboutMe ? fullText : <></>}
            {displayShowMore && (
              <span
                onClick={() => setIsShowMoreActive(!isShowMoreActive)}
                className={style.showMore}
              >
                {isShowMoreActive ? 'Hide' : 'Show more'}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
