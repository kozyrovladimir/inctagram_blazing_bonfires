import React, { ChangeEvent, FC, useState } from 'react'

import Image from 'next/image'

import style from '../profilePostModal/PostModal.module.scss'

import { FilterPhoto } from '@/features/profile-setting/ui/profilePostModal/FilterPhoto'
import notPhotoImg from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type Props = {
  closeWindow: () => void
}

export const PostModal: FC<Props> = ({ closeWindow }) => {
  const [photoPost, setPhotoPost] = useState<File | null>(null)
  const [isCropping, setIsCropping] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setPhotoPost(file)
      setIsCropping(true)
      setShowButtons(true)
    }
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoPost')?.click()
  }

  const openDraftHandler = () => {}

  return (
    <Modal
      title={isCropping ? 'Cropping' : 'Add photo'}
      callBackCloseWindow={closeWindow}
      styles={{ width: '492px', height: '564px' }}
      isShowButton={false}
      headerClassName={style.darkHeader}
      showButtons={!showButtons}
    >
      <div className={style.contentWrapper}>
        {photoPost && isCropping ? (
          <FilterPhoto photoPost={photoPost} />
        ) : (
          <>
            <div className={style.emptyContainer}>
              <Image src={notPhotoImg} alt={''} />
            </div>
            <input
              type={'file'}
              onChange={selectedPhotoHandler}
              id={'inputPhotoPost'}
              className={style.inputPhoto}
            />
            <Button
              onClick={openSelectHandler}
              size={ButtonSize.LARGE}
              className={style.buttonSelect}
            >
              Select from Computer
            </Button>
            <Button
              onClick={openDraftHandler}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.LARGE}
              className={style.buttonSelect}
            >
              Open Draft
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}
