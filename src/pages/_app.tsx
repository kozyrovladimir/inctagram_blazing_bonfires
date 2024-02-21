import '../shared/styles/globals.scss'
import { ReactElement, ReactNode } from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GetStaticProps } from 'next'
import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Provider } from 'react-redux'

import { WithAuth } from '@/shared/hoc/withAuth/WithAuth'
import { wrapper } from '@/shared/providers/storeProvider/model/store'

const client = new ApolloClient({
  uri: 'https://inctagram.work/api/v1/graphql',
  cache: new InMemoryCache(),
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return getLayout(
    <WithAuth>
      <Component {...pageProps} />
    </WithAuth>
  )
}
const TranslateApp = appWithTranslation(App)

function myApp(props: AppProps) {
  const { store } = wrapper.useWrappedStore({ ...props })

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider
        clientId={'617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'}
      >
        <Provider store={store}>
          <TranslateApp {...props} />
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  )
}

export default myApp
