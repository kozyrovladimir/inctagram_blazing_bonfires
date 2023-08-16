import React, { useState } from 'react'

import Image from 'next/image'

import styles from './ProfilePhoto.module.scss'

import { PhotoModal } from '@/features/profile-setting'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

export const ProfilePhoto = () => {
  const [open, setOpen] = useState(false)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <div className={styles.photoContainer}>
        <Image src={noImage} alt="no photo" width={48} height={48} />
      </div>
      <Button
        size={ButtonSize.MIDDLE}
        theme={ButtonTheme.CLEAR}
        className={styles.button}
        onClick={openModal}
      >
        Add a Profile Photo
      </Button>
      {open && <PhotoModal closeWindow={() => setOpen(false)} />}
    </>
  )
}
