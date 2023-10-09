import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

import { getCroppedImg } from '@/features/profile-setting/ui/profilePostModal/cropper/GetCroppedImage'
import { Photo } from '@/features/profile-setting/ui/profilePostModal/slider/SwiperSlider'

type CropType = {
  width: number
  height: number
  x: number
  y: number
}

export type PhotoType = {
  url: string;
  crop: CropType;
  aspectRatio: number;
  isOriginal: boolean;
  isImageCropped: boolean;
  image: HTMLImageElement | null;
  croppedImage: string | null;
  zoom: number;
  originalAspectRatio: number;
  id: string;
};

type CropImageType = {
  x: number
  y: number
}

type CropContextType = {
  crop: CropImageType
  setCrop: React.Dispatch<React.SetStateAction<CropImageType>>
  aspectRatio: number
  setAspectRatio: React.Dispatch<React.SetStateAction<number>>
  isOriginal: boolean
  setIsOriginal: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isImageCropped: boolean
  setIsImageCropped: React.Dispatch<React.SetStateAction<boolean>>
  croppedAreaPixels: CropType
  setCroppedAreaPixels: React.Dispatch<React.SetStateAction<CropType>>
  image: string | null
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  croppedImage: string | null
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>
  onCropComplete: (croppedArea: any, croppedAreaPixels: CropType) => void
  showCroppedImage: () => Promise<File | undefined>
  handleAspectRatioClick: (value: number) => void
  onClose: () => void
  handleCropOpen: () => void
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  handleToggleZoomInput: () => void
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  showZoomInput: boolean
  setShowZoomInput: React.Dispatch<React.SetStateAction<boolean>>
  setOriginalAspectRatio: React.Dispatch<React.SetStateAction<number>>
  originalAspectRatio: number
  selectedPhoto: Photo | null
  setSelectedPhoto: (photo: Photo | null) => void
  photos: Photo[]
  setThumbsSwiper: React.Dispatch<React.SetStateAction<any>>
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>
  thumbsSwiper: any
  isSliderOpen: boolean
  setIsSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
  photosArray: PhotoType[]
  setPhotosArray: React.Dispatch<React.SetStateAction<PhotoType[]>>
}

export const CropContext = createContext<CropContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

const CropProvider: React.FC<Props> = ({ children }) => {
  const [photosArray, setPhotosArray] = useState<PhotoType[]>([])

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(originalAspectRatio)
  const [isOriginal, setIsOriginal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageCropped, setIsImageCropped] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropType>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  })
  const [image, setImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [zoom, setZoom] = useState<number>(1)
  const [showZoomInput, setShowZoomInput] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [isSliderOpen, setIsSliderOpen] = useState(false)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async (): Promise<File | undefined> => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels)

        if (croppedImage) {
          const { url } = croppedImage

          setCroppedImage(url)
        } else {
          setCroppedImage(null)

          return undefined
        }
      }
    } catch (e) {
      console.error(e)

      return undefined
    }
  }, [image, croppedAreaPixels])

  const handleAspectRatioClick = useCallback((value: number) => {
    if (value === 0) {
      setIsOriginal(true)
      setCroppedImage(null)
    } else {
      setIsOriginal(false)
      setAspectRatio(value)
    }
  }, [])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const handleCropOpen = useCallback(() => {
    setIsModalOpen(!isModalOpen)
    setShowZoomInput(false)
  }, [isModalOpen])

  const handleToggleZoomInput = () => {
    setShowZoomInput(!showZoomInput)
    setIsModalOpen(false)
  }
  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(event.target.value))
  }

  return (
    <CropContext.Provider
      value={{
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
        handleAspectRatioClick,
        onClose,
        handleCropOpen,
        zoom,
        setZoom,
        handleZoomChange,
        handleToggleZoomInput,
        setShowZoomInput,
        showZoomInput,
        showCroppedImage,
        setOriginalAspectRatio,
        originalAspectRatio,
        selectedPhoto,
        setSelectedPhoto,
        photos,
        setPhotos,
        setThumbsSwiper,
        thumbsSwiper,
        isSliderOpen,
        setIsSliderOpen,

        photosArray,
        setPhotosArray,
      }}
    >
      {children}
    </CropContext.Provider>
  )
}

export const useImageCropContext = () => {
  const context = useContext(CropContext)

  if (!context) {
    throw new Error('useImageCropContext must be used with in a CropProvider')
  }

  return context
}
export default CropProvider
