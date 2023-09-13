import React from 'react'

import { CircularProgress } from '@mui/material'

import styles from '@/shared/ui/Loaders/Loader.module.scss'

export const CircularLoader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <CircularProgress />
    </div>
  )
}
