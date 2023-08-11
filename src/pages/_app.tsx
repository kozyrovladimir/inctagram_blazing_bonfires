import '@/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { Provider } from 'react-redux'

import { store } from '@/shared/store'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  console.log('yest')

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
