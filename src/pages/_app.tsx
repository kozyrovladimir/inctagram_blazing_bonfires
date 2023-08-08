import '@/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'

import { store } from '@/pages/store'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(App)
