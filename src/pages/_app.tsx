import '../shared/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'

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

export default props => {
  return (
    <StoreProvider>
      <App {...props} />
    </StoreProvider>
  )
}
