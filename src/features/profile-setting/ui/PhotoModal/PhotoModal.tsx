import React, { ChangeEvent, FC, useState } from 'react'

import Image from 'next/image'

import styles from './PhotoModal.module.scss'

import notPhotoImg from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type Props = {
  closeWindow: () => void
  savePhoto: (photo: null | Blob | MediaSource) => void
}

export const PhotoModal: FC<Props> = ({ closeWindow, savePhoto }) => {
  const [photoProfile, setPhotoProfile] = useState<null | Blob | MediaSource>(null)
  const [uploadError, setUploadError] = useState('')
  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const maxSize = 1 * 1024 * 1024

      if (e.target.files[0].size > maxSize) {
        setUploadError('File is too big! Choose another photo less than 1Mb')
        e.preventDefault()

        return
      } else setPhotoProfile(e.target?.files[0])
    }
  }
  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoProfile')?.click()
  }

  const savePhotoHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    savePhoto(photoProfile)
    closeWindow()
  }

  return (
    <div>
      <Modal
        title={'Add a Profile Photo'}
        callBackCloseWindow={closeWindow}
        styles={{ width: '492px', height: '564px' }}
        isShowButton={false}
      >
        <div className={styles.contentWrapper}>
          {!photoProfile && (
            <>
              <div className={styles.emptyContainer}>
                <Image src={notPhotoImg} alt={''} />
              </div>
              <input
                type={'file'}
                accept="image/*,.png,.jpg"
                onChange={selectedPhotoHandler}
                id={'inputPhotoProfile'}
                className={styles.inputPhoto}
              />
              <p className={styles.error}>{uploadError}</p>
              <Button onClick={openSelectHandler} className={styles.buttonSelect}>
                Select from Computer
              </Button>
            </>
          )}
          {photoProfile && (
            <>
              <Image
                src={URL.createObjectURL(photoProfile)}
                alt={''}
                width={332}
                height={340}
                className={styles.avatar}
              />

              <Button
                size={ButtonSize.SMALL}
                className={styles.buttonSave}
                onClick={savePhotoHandler}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
