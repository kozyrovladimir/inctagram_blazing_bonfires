import React from 'react'

import NextImage from 'next/image'
import { toast } from 'react-hot-toast'

import style from './CloseModal.module.scss'

import { CropContextType } from '@/features/create-post/context/CropProvider'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { filterBestQualityImages } from '@/features/create-post/utils/filterBestQualityImages'
import { useUploadImageMutation } from '@/shared/api/services/posts/posts.api'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'

type Props = {
  cropContext: CropContextType
}
export const CloseModal = ({ cropContext }: Props) => {
  const [uploadImage, { isLoading }] = useUploadImageMutation()
  const handleDiscard = () => {
    cropContext.resetData()
    cropContext.setIsOpenModal(false)
    cropContext.setIsOpen(false)
  }
  const handleSave = async () => {
    const formData = new FormData()

    // преобразование url всех изображений в file
    for (const photo of cropContext.photos) {
      const result = await fetch(photo.filteredUrl)
      const blob = await result.blob()
      const file = new File([blob], 'image', { type: 'image/jpg' })

      // Добавление file в FormData
      formData.append('file', file)
    }

    uploadImage(formData)
      .unwrap()
      .then(res => {
        const uploadedImages = res.images
        const filteredPhoto = filterBestQualityImages(uploadedImages)

        localStorage.setItem('uploadedImages', JSON.stringify(filteredPhoto))
        console.log('image', filteredPhoto)
        cropContext.setIsOpenModal(false)
        cropContext.setIsOpen(false)
      })
      .catch(error => {
        toast.error(error.data.messages)
      })
  }

  return (
    <>
      {isLoading && <LinearLoader />}
      <NewPostModal
        isOpen={cropContext.isOpenModal}
        title={'Close'}
        setIsOpen={() => cropContext.setIsOpenModal(false)}
        right={
          <NextImage
            style={{ cursor: 'pointer' }}
            src={closeIcon}
            alt={''}
            onClick={() => handleDiscard()}
          />
        }
      >
        <div className={style.modalWrapper}>
          <div className={style.textWrapper}>
            <p className={style.text}>
              Do you really want to close the creation of a publication? If you close everything
              will be deleted
            </p>
          </div>

          <div className={style.buttonsContainer}>
            <Button theme={ButtonTheme.CLEAR} className={style.button} onClick={handleDiscard}>
              Discard
            </Button>
            <Button className={style.button} onClick={handleSave}>
              {' '}
              Save Draft
            </Button>
          </div>
        </div>
      </NewPostModal>
    </>
  )
}
