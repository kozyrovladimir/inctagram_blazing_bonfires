import React, { useCallback, useState } from 'react'

import Image from 'next/image'
import Cropper from 'react-easy-crop'

import style from './ImageCropper.module.scss'

import getCroppedImg from '@/features/profile-setting/ui/profilePostModal/GetCroppedImage'
import { ModalButton } from '@/features/profile-setting/ui/profilePostModal/ModalButton'
import { ZoomCrop } from '@/features/profile-setting/ui/profilePostModal/ZoomCrop'
import maxmMin from '@/shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import sizePhoto from '@/shared/assets/icons/filterPostPhoto/size.svg'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

type ImageCropperProps = {
  image: string
  objectFit: 'cover'
}

type CropTYpe = {
  width: number
  height: number
  x: number
  y: number
}
const ImageCropper: React.FC<ImageCropperProps> = ({ image, objectFit }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(1)
  const [isOriginal, setIsOriginal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropTYpe>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  })
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isImageCropped, setIsImageCropped] = useState(false)
  const [zoom, setZoom] = useState<number>(1)
  const [showZoomInput, setShowZoomInput] = useState(false)
  const [isNoImageOpen, setIsNoImageOpen] = useState(false)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropTYpe): void => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)

      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, image])

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(event.target.value))
  }

  const handleAspectRatioClick = async (value: number) => {
    if (value === 0) {
      setIsOriginal(true)
      setCroppedImage(null)
    } else {
      setIsOriginal(false)
      setAspectRatio(value)
    }
  }

  const onClose = useCallback((): void => {
    setCroppedImage(null)
  }, [])

  const handleCropOpen = () => {
    setIsModalOpen(!isModalOpen)
    setShowZoomInput(false)
  }

  const handleToggleZoomInput = () => {
    setShowZoomInput(!showZoomInput)
    setIsModalOpen(false)
  }

  return (
    <div
      style={{
        display: image === null || croppedImage !== null ? 'none' : 'block',
      }}
      className={style.cropperContainer}
    >
      <Cropper
        image={image}
        aspect={isOriginal ? undefined : aspectRatio}
        crop={crop}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        zoom={zoom}
        onCropComplete={onCropComplete}
        onInteractionEnd={() => setIsModalOpen(false)}
        objectFit={isOriginal ? undefined : objectFit}
        // classes={{
        //   containerClassName: style.cropper,
        //   mediaClassName: style.cropperMedia,
        //   cropAreaClassName: style.cropArea,
        // }}
        // showGrid={false}
        // cropShape={'rect'}
      />
      <div className={style.croppedImageContainer}>
        {croppedImage ? (
          croppedImage && <img className={style.croppedImage} src={croppedImage} alt="cropped" />
        ) : (
          <>
            <div className={style.filterPanelContainer}>
              <div className={style.leftPanel}>
                <Button
                  theme={ButtonTheme.CLEAR}
                  className={style.sizeButton}
                  onClick={handleCropOpen}
                >
                  <Image src={sizePhoto} alt={''} />
                </Button>
                <Button
                  theme={ButtonTheme.CLEAR}
                  className={style.sizeButton}
                  onClick={handleToggleZoomInput}
                >
                  <Image src={maxmMin} alt={''} />
                </Button>
                <div className={style.rightButton}>
                  <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
                    <Image src={noImage} alt={''} style={{ width: '24px', height: '24px' }} />
                  </Button>
                </div>
              </div>
            </div>
            {isModalOpen && <ModalButton onAspectRatioChange={handleAspectRatioClick} />}
            {showZoomInput && (
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={handleZoomChange}
                className={style.zoomInput}
              />
            )}
            {/*<button onClick={showCroppedImage}>Crop</button>*/}
          </>
        )}
      </div>
    </div>
  )
}

export default ImageCropper
