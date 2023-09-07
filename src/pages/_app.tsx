import '../shared/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'

import { store } from '@/app/providers/StoreProvider'
import { SideBar } from '@/widgets/SideBar/SideBar'
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
      <SideBar />
      <div
        style={{
          borderLeft: '1px solid #333333',
          marginLeft: '220px',
          minHeight: '100vh',
        }}
      >
        <Component {...pageProps} />
      </div>
    </WithAuth>
  )
}

export default (props: AppProps) => {
  return (
    <StoreProvider>
      <App {...props} />
    </StoreProvider>
  )
}
