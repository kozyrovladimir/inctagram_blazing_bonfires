import React, { FC, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'

import maxmMin from '../../../../shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import restangle from '../../../../shared/assets/icons/filterPostPhoto/restangle.svg'
import sizePhoto from '../../../../shared/assets/icons/filterPostPhoto/size.svg'
import noImage from '../../../../shared/assets/icons/image/no-image.svg'

import style from './FilterPhoto.module.scss'

import { FilterPhotoPanel } from '@/features/profile-setting/ui/profilePostModal/FilterPhotoPanel'
import ImageCropper from '@/features/profile-setting/ui/profilePostModal/ImageCropper'
import { ModalButton } from '@/features/profile-setting/ui/profilePostModal/ModalButton'
import { useCrop } from '@/features/profile-setting/ui/profilePostModal/useCrop'
import { ZoomCrop } from '@/features/profile-setting/ui/profilePostModal/ZoomCrop'

type Props = {
  photoPost: File | null
}

export const FilterPhoto: FC<Props> = ({ photoPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const handleImageClick = () => {
    setShowEditor(!showEditor)
  }
  const handleCropOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div>
      {photoPost && (
        <div className={style.image}>
          <ImageCropper image={URL.createObjectURL(photoPost)} objectFit={'cover'} />
          <div className={style.filterPanelContainer}>
            <div className={style.leftPanel}>
              <FilterPhotoPanel
                backgroundImage={restangle}
                overlayImage={sizePhoto}
                onClick={handleCropOpen}
              />
              {showEditor && <ZoomCrop image={URL.createObjectURL(photoPost)} />}
              <FilterPhotoPanel
                backgroundImage={restangle}
                overlayImage={maxmMin}
                onClick={handleImageClick}
              />
            </div>
            <FilterPhotoPanel backgroundImage={restangle} overlayImage={noImage} />
          </div>
        </div>
      )}
    </div>
  )
}
