import React, { ChangeEvent, FC, useState } from 'react'

import Image from 'next/image'

import notPhotoImg from '../../public/avatarProfile/notPhoto.png'
import { ModalWindow } from '../../shared/modalWindow/ModalWindow'
import { Button, ButtonSize } from '../../shared/ui/Button/Button'

import style from './PhotoMW.module.scss'

type Props = {
  closeWindow: () => void
}

export const PhotoMW: FC<Props> = ({ closeWindow }) => {
  const [photoProfile, setPhotoProfile] = useState<null | Blob | MediaSource>(null)
  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setPhotoProfile(e.target.files[0])
    }
  }
  const openSelectHandler = () => {
    document.getElementById('inputPhotoProfile')?.click()
  }

  const savePhotoHandler = () => {}

  return (
    <div>
      <ModalWindow
        title={'Add a Profile Photo'}
        callBackCloseWindow={closeWindow}
        styles={{ width: '492px', height: '564px' }}
        isShowButton={false}
      >
        <div className={style.contentWrapper}>
          {!photoProfile && (
            <>
              <div className={style.emptyContainer}>
                <Image src={notPhotoImg} alt={''} />
              </div>
              <input
                type={'file'}
                onChange={selectedPhotoHandler}
                id={'inputPhotoProfile'}
                className={style.inputPhoto}
              />
              <Button onClick={openSelectHandler} className={style.buttonSelect}>
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
                className={style.avatar}
              />

              <Button
                size={ButtonSize.SMALL}
                className={style.buttonSave}
                onClick={savePhotoHandler}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </ModalWindow>
    </div>
  )
}
