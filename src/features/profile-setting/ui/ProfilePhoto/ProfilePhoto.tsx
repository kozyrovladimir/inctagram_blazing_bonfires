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
}

export const ProfilePhoto = ({ outsideOnChange, photoFromServer }: Props) => {
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState<null | Blob | MediaSource>(null)
  const [photoServer, setPhotoServer] = useState<null | AvatarsType>(null)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpen(true)
  }

  useEffect(() => setPhotoServer(photoFromServer), [photoFromServer])

  return (
    <>
      <div className={styles.photoContainer}>
        {(photo || photoServer) && (
          <Image
            src={photoServer ? (photoServer[0].url as string) : URL.createObjectURL(photo as Blob)}
            width={200}
            priority={true}
            height={250}
            alt="avatar"
          />
        )}
        {!(photo || photoServer) && <Image src={noImage} alt="no photo" width={48} height={48} />}
      </div>
      <Button
        size={ButtonSize.MIDDLE}
        theme={ButtonTheme.CLEAR}
        className={styles.button}
        onClick={openModal}
      >
        Add a Profile Photo
      </Button>
      {open && (
        <PhotoModal
          savePhoto={data => {
            setPhoto(data)
            setPhotoServer(null)
            data && outsideOnChange(data as Blob)
          }}
          closeWindow={() => setOpen(false)}
        />
      )}
    </>
  )
}
