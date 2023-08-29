import React, { useCallback, useState } from 'react'

import getCroppedImg from '@/features/profile-setting/ui/profilePostModal/GetCroppedImage'

type CropTYpe = {
  width: number
  height: number
  x: number
  y: number
}
export const useCrop = () => {
  const [image, setImage] = useState<string | null>(null)
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

  const onCropComplete = useCallback((croppedAreaPixels: CropTYpe): void => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      if (image) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels)

        setCroppedImage(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, image])

  const handleAspectRatioClick = (value: number) => {
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

  return {
    crop,
    setCrop,
    aspectRatio,
    setAspectRatio,
    isOriginal,
    setIsOriginal,
    isModalOpen,
    setIsModalOpen,
    isImageCropped,
    setIsImageCropped,
    croppedAreaPixels,
    setCroppedAreaPixels,
    image,
    setImage,
    croppedImage,
    setCroppedImage,
    onCropComplete,
    showCroppedImage,
    handleAspectRatioClick,
    onClose,
    handleCropOpen,
  }
}
