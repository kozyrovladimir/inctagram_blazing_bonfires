import React from 'react'

import Image from 'next/image'
import Cropper from 'react-easy-crop'

import style from './ImageCropper.module.scss'

import { useImageCropContext } from '@/features/profile-setting/ui/profilePostModal/CropProvider'
import { ModalButton } from '@/features/profile-setting/ui/profilePostModal/ModalButton'
import maxmMin from '@/shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import sizePhoto from '@/shared/assets/icons/filterPostPhoto/size.svg'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { classNames } from '@/shared/libs/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

type ImageCropperProps = {
  // image: string
  objectFit: 'cover'
}
const ImageCropper: React.FC<ImageCropperProps> = ({ objectFit }) => {
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
    handleAspectRatioClick,
    isModalOpen,
    handleCropOpen,
    showZoomInput,
    handleZoomChange,
    handleToggleZoomInput,
    image,
    showCroppedImage,
  } = useImageCropContext()

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: aspectRatio >= 1,
    [style.imageFullHeight]: aspectRatio < 1,
  })

  // debugger

  return (
    <div>
      <div
        style={{
          display: image === null || croppedImage !== null ? 'none' : 'block',
        }}
      >
        <Cropper
          image={image || undefined}
          aspect={isOriginal ? undefined : aspectRatio}
          crop={crop}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          zoom={zoom}
          onCropComplete={onCropComplete}
          onInteractionEnd={() => setIsModalOpen(false)}
          objectFit={isOriginal ? undefined : objectFit}
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
            <div className={style.filterPanelContainer}>
              <div className={style.leftPanel}>
                <div className={style.buttonContainer}>
                  {isModalOpen && <ModalButton onAspectRatioChange={handleAspectRatioClick} />}
                  <Button
                    theme={ButtonTheme.CLEAR}
                    className={style.sizeButton}
                    onClick={handleCropOpen}
                  >
                    <Image src={sizePhoto} alt={''} />
                  </Button>
                </div>
                <div>
                  {showZoomInput && (
                    <div className={style.zoomInput}>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={handleZoomChange}
                      />
                    </div>
                  )}
                  <Button
                    theme={ButtonTheme.CLEAR}
                    className={style.sizeButton}
                    onClick={handleToggleZoomInput}
                  >
                    <Image src={maxmMin} alt={''} />
                  </Button>
                </div>
              </div>
              <div className={style.rightButton}>
                <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
                  <Image src={noImage} alt={''} style={{ width: '24px', height: '24px' }} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageCropper
