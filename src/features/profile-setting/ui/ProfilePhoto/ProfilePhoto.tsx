import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './ProfilePhoto.module.scss'

import { PhotoModal } from '@/features/profile-setting/ui/PhotoModal/PhotoModal'
import { AvatarsType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { RoundRedBtn } from '@/shared/ui/roundRedBtn/roundRedBtn'

type Props = {
  outsideOnChange: (photo: Blob) => void
  photoFromServer: AvatarsType
  deleteAvatar: (data: boolean) => void
}

export const ProfilePhoto = ({ outsideOnChange, photoFromServer, deleteAvatar }: Props) => {
  const { t } = useTranslation()
  const isPhotoFromServer = photoFromServer?.length > 0
  const photoDefaultSRC = (isPhotoFromServer && (photoFromServer[0].url as string)) || noImage

  const [open, setOpen] = useState(false)
  const [photoSRC, setphotoSRC] = useState<string>(photoDefaultSRC)
  const [isDeleteBtn, setIsDeleteBtn] = useState<boolean>(isPhotoFromServer)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpen(true)
  }

  const savePhoto = (photo: Blob | MediaSource | null) => {
    setphotoSRC(URL.createObjectURL(photo as Blob))
    deleteAvatar(false)
    setIsDeleteBtn(true)
    photo && outsideOnChange(photo as Blob)
  }

  const deletePhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setphotoSRC(noImage)
    deleteAvatar(true)
    setIsDeleteBtn(false)
  }

  return (
    <div className={styles.container}>
      {isDeleteBtn && (
        <div className={styles.delPhotoBtn}>
          <RoundRedBtn onClick={deletePhoto} />
        </div>
      )}
      <div className={styles.photoContainer}>
        <Image
          src={photoSRC}
          width={photoSRC === noImage ? 48 : 192}
          priority={true}
          height={photoSRC === noImage ? 48 : 192}
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
        {t('AddProfilePhoto')}
      </Button>

      {open && <PhotoModal savePhoto={savePhoto} closeWindow={() => setOpen(false)} />}
    </div>
  )
}
