import React from 'react'

import styles from '@/shared/ui/Loaders/Loader.module.scss'

export const CircularLoader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <CircularLoader />
    </div>
  )
}
