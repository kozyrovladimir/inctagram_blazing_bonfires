import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Logout } from '@/features/logout'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'

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
        {/*todo remove temp centering wrapper, it's used only for decoration*/}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '130px',
          }}
        >
          <Logout />
        </div>

        {/*todo remove temp links*/}
        <TempNavigationLinks />
      </main>
    </>
  )
}
Home.getLayout = getLayout
export default Home

const TempNavigationLinks = () => {

  return (
    <ul
      style={{
        opacity: '0.5',
        listStyleType: 'none',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        marginTop: '120px',
        paddingLeft: '0',
      }}
    >
      !! only for development
      <li>
        <Link href="/sign-in">sign-in</Link>
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
        <Link href="/auth/expired-verification-link">expired-verification-link</Link>
      </li>
      <li>
        <Link href="/create-new-password">create-new-password</Link>
      </li>
      <li>
        <Link href="/auth/confirmed-email">confirmed-email</Link>
      </li>
      <li>
        <Link href="/auth/terms-of-service">terms of service</Link>
      </li>
      <li>
        <Link href="/auth/privacy-policy">privacy policy</Link>
      </li>
    </ul>
  )
}
