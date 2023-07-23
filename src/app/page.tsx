import styles from './page.module.scss'

import { Header } from '@/components/Header/Header'

export default function Home() {
  return (
    <main>
      <Header />
      <h2 className={styles.title}>Main Page</h2>
    </main>
  )
}
