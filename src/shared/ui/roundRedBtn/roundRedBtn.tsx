import React from 'react'

import styles from './roundRedBtn.module.scss'
interface IRoundRedBtnProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const RoundRedBtn = ({ onClick }: IRoundRedBtnProps) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <div className={styles.redBtn}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
      </div>
    </button>
  )
}
