import '@/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { appWithTranslation } from 'next-i18next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return getLayout(<Component {...pageProps} />)
}

export default appWithTranslation(App)
