import React from 'react'

import Image from 'next/image'

import styles from './ProfilePhoto.module.scss'

import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

export const ProfilePhoto = () => {
  return (
    <>
      <div className={styles.photoContainer}>
        <Image src={noImage} alt="no photo" width={48} height={48} />
      </div>
      <Button size={ButtonSize.MIDDLE} theme={ButtonTheme.CLEAR} className={styles.button}>
        Add a Profile Photo
      </Button>
    </>
  )
}
