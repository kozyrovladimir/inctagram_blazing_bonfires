import React, { useEffect, useRef } from 'react'

import LoadingBar from 'react-top-loading-bar'

import styles from '../Loader.module.scss'

export const LinearLoader = ({ start = true }) => {
  let ref = useRef<any>(null)

  useEffect(() => {
    if (start) {
      ref.current.continuousStart()
    }

    return () => ref.current.clean()
  }, [start])

  return (
    <div className={styles.loaderWrapper}>
      <LoadingBar color="#f11946" ref={ref} />
    </div>
  )
}
