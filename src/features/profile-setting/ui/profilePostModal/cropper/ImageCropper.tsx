import React from 'react'

import Cropper from 'react-easy-crop'

import style from './ImageCropper.module.scss'

import { ButtonFilterPanel } from '@/features/profile-setting'
import { useImageCropContext } from '@/features/profile-setting/ui/profilePostModal/cropper/CropProvider'
import { classNames } from '@/shared/libs/classNames/classNames'

type Props = {
  objectFit: 'cover'
}
export const ImageCropper: React.FC<Props> = ({ objectFit }) => {
  const {
    croppedImage,
    onCropComplete,
    crop,
    setCrop,
    aspectRatio,
    isOriginal,
    zoom,
    setZoom,
    setIsModalOpen,
    image,
    originalAspectRatio,
  } = useImageCropContext()

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: aspectRatio >= 1,
    [style.imageFullHeight]: aspectRatio < 1,
  })

  return (
    <div>
      <div
        style={{
          display: image === null || croppedImage !== null ? 'none' : 'block',
        }}
      >
        <Cropper
          image={image || undefined}
          aspect={isOriginal ? originalAspectRatio : aspectRatio}
          crop={crop}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          zoom={zoom}
          onCropComplete={onCropComplete}
          onInteractionEnd={() => setIsModalOpen(false)}
          objectFit={isOriginal ? undefined : objectFit}
          showGrid={false}
          classes={{
            cropAreaClassName: style.cropArea,
          }}
        />
      </div>
      <div className={style.croppedImageContainer}>
        {croppedImage ? (
          croppedImage && <img className={imageClasses} src={croppedImage} alt="cropped" />
        ) : (
          <>
            <ButtonFilterPanel />
          </>
        )}
      </div>
    </div>
  )
}
