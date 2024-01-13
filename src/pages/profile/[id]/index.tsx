import React from 'react'

import { GetServerSideProps } from 'next'
import { Toaster } from 'react-hot-toast'

import style from './ProfileId.module.scss'

import { PublicPost } from '@/entities/publicPost'
import { PublicProfile } from '@/entities/publicProfile'
import { publicApi } from '@/shared/api'
import {
  PublicProfilePostsResponseType,
  PublicProfileType,
} from '@/shared/api/services/public/public.api.types'
import { makePublicPageLayout } from '@/shared/layouts'
import { store } from '@/shared/providers/storeProvider'
import { ServerSidePropsType } from '@/shared/types/commonTypes'
import { ContentWrapper } from '@/shared/ui'

type PropsType = {
  profileData: PublicProfileType
  postData: PublicProfilePostsResponseType
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query

  // get data about user
  store.dispatch(
    publicApi.endpoints?.getPublicProfile.initiate(Number(id) as number, { forceRefetch: true })
  )

  const data: Array<ServerSidePropsType<PublicProfileType>> = await Promise.all(
    store.dispatch(publicApi.util?.getRunningQueriesThunk())
  )
    .then(res => {
      return res
    })
    .catch(error => {
      return error
    })

  if (!data[0].data) {
    return {
      redirect: {
        destination: '/404' /*  todo Редирект на 404  */,
        permanent: false,
      },
    }
  }

  // get data about user's posts
  store.dispatch(
    publicApi.endpoints?.getPublicProfilePosts.initiate(
      { userId: Number(id) },
      { forceRefetch: true }
    )
  )
  const post: Array<ServerSidePropsType<PublicProfilePostsResponseType>> = await Promise.all(
    store.dispatch(publicApi.util?.getRunningQueriesThunk())
  )
    .then(res => {
      return res
    })
    .catch(error => {
      return error
    })

  return {
    props: { profileData: data[0].data, postData: post[0].data },
  }
}

function PublicProfilePage(props: PropsType) {
  const { profileData, postData } = props
  const isAuth = false /* todo не залогинен */

  return (
    <div className={style.home}>
      <Toaster position={'bottom-center'} />
      <ContentWrapper className={style.homeContentWrapper}>
        {!isAuth && (
          <div className={style.publicProfileContainer}>
            <div className={style.publicContainer}>
              <PublicProfile data={profileData} />
            </div>
            <div className={style.postsContainer}>
              {postData && postData.items.map(post => <PublicPost key={post.id} {...post} />)}
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

PublicProfilePage.getLayout = makePublicPageLayout
export default PublicProfilePage
