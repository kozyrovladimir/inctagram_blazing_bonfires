import { CircularProgress } from '@mui/material'

import styles from './CircularProgressLoader.module.scss'

export const CircularProgressLoader = () => {
  return (
    <div className={styles.CircularProgressLoader}>
      <CircularProgress />
    </div>
  )
}
