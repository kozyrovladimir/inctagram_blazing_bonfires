import React from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Toaster } from 'react-hot-toast'

import s from './Home.module.scss'

import { Post } from '@/entities/post'
import { useGetAllPublicPostsQuery } from '@/shared/api/services/posts/posts.api'
import { makePublicPageLayout } from '@/shared/layouts'
import { ContentWrapper, LinearLoader } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function Home() {
  const { t } = useTranslation()
  const { data: publicPosts, isLoading: isGetAllPublicPostsLoading } = useGetAllPublicPostsQuery({
    endCursorPostId: '',
    pageSize: '4',
    sortBy: 'pageSize',
    sortDirection: 'desc',
  })

  const isLoading = isGetAllPublicPostsLoading || !publicPosts

  return (
    <div className={s.home}>
      <Toaster position={'bottom-center'} />
      {isLoading && <LinearLoader />}
      <ContentWrapper>
        <div style={{ height: '72px' }}>Registered users</div>
        <div className={s.postsContainer}>
          {publicPosts?.items.map(post => <Post key={post.id} {...post} />)}
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Home
// const TempNavigationLinks = () => {
//   return (
//     <ul
//       style={{
//         opacity: '0.5',
//         listStyleType: 'none',
//         position: 'relative',
//         left: '50%',
//         transform: 'translateX(-50%)',
//         width: 'fit-content',
//         marginTop: '120px',
//         paddingLeft: '0',
//       }}
//     >
//       !! only for development
//       <li>
//         <Link href="/sign-in">sign-in</Link>
//       </li>
//       <li>
//         <Link href="/sign-up">sign-up</Link>
//       </li>
//       <li>
//         <Link href="/sent-email">sent-email</Link>
//       </li>
//       <li>
//         <Link href="/merge-accounts">merge-accounts</Link>
//       </li>
//       <li>
//         <Link href="/invalid-verification-link">invalid-verification-link</Link>
//       </li>
//       <li>
//         <Link href="/forgot-password">forgot-password</Link>
//       </li>
//       <li>
//         <Link href="/auth/expired-verification-link">expired-verification-link</Link>
//       </li>
//       <li>
//         <Link href="/create-new-password">create-new-password</Link>
//       </li>
//       <li>
//         <Link href="/auth/confirmed-email">confirmed-email</Link>
//       </li>
//       <li>
//         <Link href="/auth/terms-of-service">terms of service</Link>
//       </li>
//       <li>
//         <Link href="/auth/privacy-policy">privacy policy</Link>
//       </li>
//       <li>
//         <Link href="/super-admin/users-list">Super Admin</Link>
//       </li>
//     </ul>
//   )
// }
