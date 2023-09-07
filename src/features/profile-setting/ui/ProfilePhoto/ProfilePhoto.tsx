/* eslint-disable no-nested-ternary */
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
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState<null | Blob | MediaSource>(null)
  const [photoServer, setPhotoServer] = useState<null | AvatarsType>(null)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpen(true)
  }
  const deletePhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setPhoto(null)
    setPhotoServer(null)
    deleteAvatar(true)
  }
  const savePhoto = (photo: Blob | MediaSource | null) => {
    // setPhotoServer(null)
    // deleteAvatar(false)
    setPhoto(photo)

    photo && outsideOnChange(photo as Blob)
  }

  useEffect(() => {
    setPhotoServer(photoFromServer)
  }, [photoFromServer])

  const photoSRC =
    (photo && URL.createObjectURL(photo as Blob)) ||
    (photoServer?.length && (photoServer[0].url as string)) ||
    noImage

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
