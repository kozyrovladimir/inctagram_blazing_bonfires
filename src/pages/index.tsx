import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import { Header } from '@/components/Header/Header'
import { Logout } from '@/components/Logout/Logout'
import { getLayout } from '@/shared/layout/MainLayout/MainLayout'
const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>
          <Header />
          <ul>
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
              <Link href="/expired-verification-link">expired-verification-link</Link>
            </li>
            <li>
              <Link href="/create-new-password">create-new-password</Link>
            </li>
            <li>
              <Link href="/confirmed-email">confirmed-email</Link>
            </li>
          </ul>
          <Logout />
        </main>
      </QueryClientProvider>
    </>
  )
}
Home.getLayout = getLayout
export default Home
