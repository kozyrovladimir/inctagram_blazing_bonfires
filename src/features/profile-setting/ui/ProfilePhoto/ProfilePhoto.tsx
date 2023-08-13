import React from 'react'

import Image from 'next/image'

import noImage from '../../../../../public/assets/icons/image/no-image.svg'
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button'

import styles from './ProfilePhoto.module.scss'

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
