import '../shared/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { appWithTranslation } from 'next-i18next'

import { StoreProvider } from '../shared/providers/storeProvider'

import { RoutersPath } from '@/shared/constants/paths'
import { WithAuth } from '@/shared/hoc/withAuth/WithAuth'
import { SideBar } from '@/widgets/sideBar/ui/SideBar'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  const { pathname } = useRouter()

  const pathWithoutSidebar: string[] = [
    RoutersPath.authExpirredVerificationLink,
    RoutersPath.signIn,
    RoutersPath.signUp,
    RoutersPath.sentEmail,
    RoutersPath.mergeAccounts,
    RoutersPath.invalidVerificationLink,
    RoutersPath.forgotPassword,
    RoutersPath.createNewPassword,
    RoutersPath.authConfirmedEmail,
    RoutersPath.authTermsOfService,
    RoutersPath.authPrivacyPolicy,
  ]

  const isSidebar = !pathWithoutSidebar.includes(pathname)

  return getLayout(
    <WithAuth>
      {isSidebar && <SideBar />}
      <div
        style={
          isSidebar
            ? {
                marginLeft: '220px',
                minHeight: '100vh',
              }
            : undefined
        }
      >
        <Component {...pageProps} />
      </div>
    </WithAuth>
  )
}

function myApp(props: AppProps) {
  return (
    <StoreProvider>
      <GoogleOAuthProvider
        clientId={'617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'}
      >
        <App {...props} />
      </GoogleOAuthProvider>
    </StoreProvider>
  )
}

export default appWithTranslation(myApp)
