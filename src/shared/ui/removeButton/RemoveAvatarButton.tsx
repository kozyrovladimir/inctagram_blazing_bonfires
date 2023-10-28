import React from 'react'

import styles from './RemoveAvatarButton.module.scss'
type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const RemoveAvatarButton = ({ onClick }: Props) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <div className={styles.redBtn}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
      </div>
    </button>
  )
}
