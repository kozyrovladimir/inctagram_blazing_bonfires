import React, { ChangeEvent, FC, useState } from 'react'

import NextImage from 'next/image'

import style from '../profilePostModal/PostModal.module.scss'

import CropProvider, {
  useImageCropContext,
} from '@/features/profile-setting/ui/profilePostModal/CropProvider'
import { readFile } from '@/features/profile-setting/ui/profilePostModal/GetCroppedImage'
import ImageCropper from '@/features/profile-setting/ui/profilePostModal/ImageCropper'
import { ModalComponent } from '@/features/profile-setting/ui/profilePostModal/ModalComponent'
import notPhotoImg from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

type Props = {
  closeWindow: () => void
}

export const PostModal: FC<Props> = ({ closeWindow }) => {
  const [photoPost, setPhotoPost] = useState<File | null>(null)
  const [isCropping, setIsCropping] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const { setImage, showCroppedImage, setOriginalAspectRatio } = useImageCropContext()

  // const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length) {
  //     const file = e.target.files[0]
  //
  //     setPhotoPost(file)
  //     setIsCropping(true)
  //     setShowButtons(true)
  //   }
  // }
  // const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files
  //
  //   if (files && files.length > 0) {
  //     const file = files[0]
  //     const imageDataUrl = await readFile(file)
  //
  //     setImage(imageDataUrl)
  //     setPhotoPost(file)
  //     setIsCropping(true)
  //     setShowButtons(true)
  //   }
  // }
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files && files[0]

    if (file) {
      const image: HTMLImageElement = new Image()

      const imageDataUrl = await readFile(file)

      image.src = imageDataUrl

      image.onload = () => {
        const aspectRatio = image.width / image.height

        // debugger
        setOriginalAspectRatio(aspectRatio)
        setImage(imageDataUrl)
        setIsCropping(true)
        setShowButtons(true)
      }
    }
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoPost')?.click()
  }

  const openDraftHandler = () => {}

  return (
    <ModalComponent
      title={isCropping ? 'Cropping' : 'Add photo'}
      callBackCloseWindow={closeWindow}
      showButtons={!showButtons}
    >
      <>
        {isCropping ? (
          <div className={style.crop}>
            <ImageCropper objectFit={'cover'} />
          </div>
        ) : (
          <div className={style.contentWrapper}>
            <div className={style.emptyContainer}>
              <NextImage src={notPhotoImg} alt={''} />
            </div>
            <input
              type={'file'}
              onChange={handleFileChange}
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
          </div>
        )}
      </>
    </ModalComponent>
  )
}
