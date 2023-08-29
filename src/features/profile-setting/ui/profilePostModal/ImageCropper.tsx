import React, { useCallback, useState } from 'react'

import Cropper from 'react-easy-crop'
import { Crop } from 'react-image-crop'

import style from './ImageCropper.module.scss'

import { FilterPhotoPanel } from '@/features/profile-setting/ui/profilePostModal/FilterPhotoPanel'
import getCroppedImg from '@/features/profile-setting/ui/profilePostModal/GetCroppedImage'
import { ModalButton } from '@/features/profile-setting/ui/profilePostModal/ModalButton'

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
  }

  return (
    <div>
      <button
        style={{
          display: image === null || croppedImage !== null ? 'none' : 'block',
          marginTop: '600px',
        }}
        onClick={showCroppedImage}
      >
        Crop
      </button>
      <div className={style.buttonSize}>
        <button onClick={handleCropOpen}> Next</button>
        {isModalOpen && <ModalButton onAspectRatioChange={handleAspectRatioClick} />}
        <div
          className={style.container}
          style={{
            display: image === null || croppedImage !== null ? 'none' : 'block',
          }}
        >
          <div className={style.cropContainer}>
            <Cropper
              image={image}
              aspect={isOriginal ? undefined : aspectRatio}
              crop={crop}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              objectFit={isOriginal ? undefined : objectFit}
            />
          </div>
        </div>
        <div className={style.croppedImageContainer}>
          {croppedImage && <img className={style.croppedImage} src={croppedImage} alt="cropped" />}
          {croppedImage && <button onClick={onClose}>close</button>}
        </div>
      </div>
    </div>
  )
}

export default ImageCropper
