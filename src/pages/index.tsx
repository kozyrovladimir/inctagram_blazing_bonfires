import Link from 'next/link'

import { getLayout } from '@/shared/layout/MainLayout/MainLayout'

function Home() {
  return (
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
  )
}
Home.getLayout = getLayout
export default Home
