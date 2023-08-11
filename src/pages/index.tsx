import { GetStaticProps } from 'next'
import { Inter } from 'next/dist/compiled/@next/font/dist/google'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Navbar } from '@/components/navbar/Navbar'
import { Logout } from '@/features/logout/ui/Logout/Logout'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
import Calendar from '@/widgets/LangSwitcher/ui/Calendar/Calendar'

// const inter = Inter({ subsets: ['latin'] })

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
        <Navbar />
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
            <Link href="/auth/confirmed-email">confirmed-email</Link>
          </li>
          <li>
            <Link href="/profile">profile</Link>
          </li>
        </ul>
        <Logout />
      </main>
    </>
  )
}
Home.getLayout = getLayout
export default Home
