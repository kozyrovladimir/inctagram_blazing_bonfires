import '@/app/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { Provider } from 'react-redux'

import { store } from '@/app/providers/StoreProvider'
import CropProvider from '@/features/profile-setting/ui/profilePostModal/cropper/CropProvider'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return getLayout(
    <CropProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CropProvider>
  )
}
