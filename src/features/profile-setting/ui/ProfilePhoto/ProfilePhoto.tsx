import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import styles from './ProfilePhoto.module.scss'

import { PhotoModal } from '@/features/profile-setting'
import { AvatarsType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

type Props = {
  outsideOnChange: (photo: Blob) => void
  photoFromServer: AvatarsType
  deleteAvatar: (data: boolean) => void
}

export const ProfilePhoto = ({ outsideOnChange, photoFromServer, deleteAvatar }: Props) => {
  const photoDefaultSRC = (photoFromServer?.length && (photoFromServer[0].url as string)) || noImage

  const [open, setOpen] = useState(false)
  const [photoSRC, setphotoSRC] = useState<string>(photoDefaultSRC)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setOpen(true)
  }

  const savePhoto = (photo: Blob | MediaSource | null) => {
    setphotoSRC(URL.createObjectURL(photo as Blob))
    deleteAvatar(false)
    photo && outsideOnChange(photo as Blob)
  }

  const deletePhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setphotoSRC(noImage)
    deleteAvatar(true)
  }

  return (
    <>
      <div className={styles.photoContainer}>
        <Image
          src={photoSRC}
          width={192}
          priority={true}
          height={192}
          alt="avatar"
          property="true"
        />
      </div>
      <Button
        size={ButtonSize.MIDDLE}
        theme={ButtonTheme.CLEAR}
        className={styles.AddPhotoBtn}
        onClick={openModal}
      >
        Add a Profile Photo
      </Button>
      <Button
        size={ButtonSize.MIDDLE}
        theme={ButtonTheme.CLEAR}
        className={styles.DelPhotoBtn}
        onClick={deletePhoto}
      >
        Delete a Profile Photo
      </Button>
      {open && <PhotoModal savePhoto={savePhoto} closeWindow={() => setOpen(false)} />}
    </>
  )
}
