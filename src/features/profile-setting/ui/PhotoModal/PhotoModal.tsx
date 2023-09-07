import React, { ChangeEvent, FC, useRef, useState } from 'react'

import Slider from '@mui/material/Slider'
import Image from 'next/image'
import AvatarEditor from 'react-avatar-editor'

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
  const cropRef = useRef<null | any>(null)
  const [slideValue, setSlideValue] = useState(10)

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

  const savePhotoHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL()
      const result = await fetch(dataUrl)
      const blob = await result.blob()

      setPhotoProfile(blob)
      savePhoto(blob)
    } else {
      savePhoto(photoProfile)
    }
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
              <AvatarEditor
                ref={cropRef}
                image={URL.createObjectURL(photoProfile)}
                width={250}
                height={250}
                border={50}
                borderRadius={150}
                color={[0, 0, 0, 0.72]}
                scale={slideValue / 10}
                rotate={0}
              />
              <Slider
                min={5}
                max={50}
                sx={{
                  margin: '0.5rem auto',
                  width: '80%',
                  color: '#2f68cc',
                }}
                size="small"
                defaultValue={slideValue}
                value={slideValue}
                onChange={(e: Event, value: number | number[]) => setSlideValue(value as number)}
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
