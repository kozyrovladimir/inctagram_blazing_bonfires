import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Logout } from '@/components/Logout/Logout'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <main>
        <div>{t('Description')}</div>
        <ul>
          <li>
            <Link href="/login">sign-in</Link>
          </li>
          <li>
            <Link href="/sign-up">sign-up</Link>
          </li>
          <li>
            <Link href="/sent-email">sent-email</Link>
          </li>
          <li>
            <Link href="/merge-accounts">merge-accounts</Link>
          </li>
          <li>
            <Link href="/invalid-verification-link">invalid-verification-link</Link>
          </li>
          <li>
            <Link href="/forgot-password">forgot-password</Link>
          </li>
          <li>
            <Link href="/expired-verification-link">expired-verification-link</Link>
          </li>
          <li>
            <Link href="/create-new-password">create-new-password</Link>
          </li>
          <li>
            <Link href="/confirmed-email">confirmed-email</Link>
          </li>
          <li>
            <Link href="/index">confirmed-email</Link>
          </li>
          {/*<li>*/}
          {/*  <Link href={{ pathname: '/auth/registration-confirmation', query: { code } }}>*/}
          {/*    registration-confirmation*/}
          {/*  </Link>*/}
          {/*</li>*/}
        </ul>
        <Logout />
      </main>
    </>
  )
}
Home.getLayout = getLayout
export default Home

// test commit
