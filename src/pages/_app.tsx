import '../shared/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { appWithTranslation } from 'next-i18next'

import { WithAuth } from '@/shared/hoc/WithAuth/WithAuth'
import { StoreProvider } from '@/shared/providers/StoreProvider'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return getLayout(
    <WithAuth>
      <Component {...pageProps} />
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
