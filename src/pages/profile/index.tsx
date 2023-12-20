import { useEffect, useState } from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import noImage from '../../shared/assets/icons/avatarProfile/notPhoto.png'

import style from './profile.module.scss'

import { Posts } from '@/features/post/ui/posts/Posts'
import { useLazyGetUserPostsQuery } from '@/shared/api/services/posts/posts.api'
import { useLazyGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
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

const postsAmount = 9

function Profile() {
  const {
    t,
    i18n: { t: tRoot, language },
  } = useTranslation('common', { keyPrefix: 'Profile' })
  const router = useRouter()
  const [getProfile, { data: profileData }] = useLazyGetProfileUserQuery()
  const [getUserPosts, { data: userPost }] = useLazyGetUserPostsQuery()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsAmount)
  const [pageCount, setPageCount] = useState(1)
  const [userId, setUserId] = useState<number | null>(null)
  const [totalCount, setTotalCount] = useState(postsAmount)
  const [endCursorPostId, setEndCursorPostId] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  const posts = userPost?.items || []

  useEffect(() => {
    getProfile()
      .unwrap()
      .then(res => {
        if (res.id) {
          setUserId(res.id)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (userId && isFetching && posts.length < totalCount) {
      getUserPosts({ userId, pageNumber, pageSize, endCursorPostId })
        .unwrap()
        .then(res => {
          setPageCount(res.pagesCount)
          setPageSize(prev => prev + postsAmount)
          setIsFetching(false)
          setTotalCount(res.totalCount)
        })
    }
  }, [isFetching, userId])

  const scrollHandler = () => {
    const { scrollHeight } = document.documentElement
    const { scrollTop } = document.documentElement
    const { innerHeight } = window

    if (scrollHeight - (scrollTop + innerHeight) < 100 && posts.length < totalCount) {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => document.removeEventListener('scroll', scrollHandler)
  }, [totalCount])

  return (
    <div className={style.profileContainer}>
      <div className={style.headerContainer}>
        <div className={style.avatarContainer}>
          <Image src={noImage} alt={'avatar'} width={48} height={48} />
        </div>
        <div className={style.profileInfoContainer}>
          <div className={style.profileTitleContainer}>
            <div>{profileData?.userName}</div>
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
      </div>
      <div className={style.photosContainer}>
        <Posts posts={posts} />
      </div>
    </div>
  )
}

Profile.getLayout = getLayout
export default Profile
