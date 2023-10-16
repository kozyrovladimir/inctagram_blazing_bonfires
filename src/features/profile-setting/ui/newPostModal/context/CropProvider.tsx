import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

import { getCroppedImg } from '@/features/profile-setting/ui/profilePostModal/cropper/GetCroppedImage'
import { Photo } from '@/features/profile-setting/ui/profilePostModal/slider/SwiperSlider'

export type CropType = {
  width: number
  height: number
  x: number
  y: number
}

export type PhotoType = {
  url: string;
  crop: CropImageType;
  aspectRatio: number;
  isOriginal: boolean;
  isImageCropped: boolean;
  croppedImage: string | null;
  zoom: number;
  originalAspectRatio: number;
  id: string;
};

type CropImageType = {
  x: number
  y: number
}

const initialState: PhotoType[] = [
  {
    url: '',
    crop: { x: 0, y: 0 },
    aspectRatio: 1,
    isOriginal: false,
    isImageCropped: false,
    croppedImage: null,
    zoom: 1,
    originalAspectRatio: 1,
    id: '',
  },
]

export type CropContextType = {
  crop: CropImageType
  setCrop: (crop: CropImageType) => void
  aspectRatio: number
  setAspectRatio: (aspectRatio: number) => void
  isOriginal: boolean
  // setIsOriginal: (isOriginal: boolean) => void
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
  handleToggleZoomInput: () => void
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  showZoomInput: boolean
  setShowZoomInput: React.Dispatch<React.SetStateAction<boolean>>
  // setOriginalAspectRatio: (originalAspectRatio: number) => void
  originalAspectRatio: number
  selectedPhoto: Photo | null
  setSelectedPhoto: (photo: Photo | null) => void
  photosArray: PhotoType[]
  setPhotosArray: React.Dispatch<React.SetStateAction<PhotoType[]>>
  setThumbsSwiper: React.Dispatch<React.SetStateAction<any>>
  thumbsSwiper: any
  isSliderOpen: boolean
  setIsSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
  setZoom: (zoom: number) => void
}

export const CropContext = createContext< CropContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

const CropProvider: React.FC<Props> = ({ children }) => {
  const [photosArray, setPhotosArray] = useState<PhotoType[]>(initialState)
  // const [originalAspectRatio, setOriginalAspectRatio] = useState(1)
  // const [aspectRatio, setAspectRatio] = useState(originalAspectRatio)
  // const [isOriginal, setIsOriginal] = useState(false)
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
  const [showZoomInput, setShowZoomInput] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
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

  // zoom
  const zoom = photosArray[0].zoom;

  const setZoom = (zoom: number) => {
    const updatedPhoto = { ...photosArray[0], zoom }; // Создаем новый объект с обновленным значением zoom
    const updatedPhotosArray = [...photosArray];
    updatedPhotosArray[0] = updatedPhoto; // Заменяем элемент в массиве
    setPhotosArray(updatedPhotosArray)
  }

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(event.target.value))
  }

  //crop
  const crop = photosArray[0].crop;

  const setCrop = (crop: CropImageType) => {
    const updatedPhoto = { ...photosArray[0], crop }; // Создаем новый объект с обновленным значением crop
    const updatedPhotosArray = [...photosArray];
    updatedPhotosArray[0] = updatedPhoto; // Заменяем элемент в массиве
    setPhotosArray(updatedPhotosArray)
  }

  // isOriginal
  const isOriginal = photosArray[0].isOriginal;
  const setIsOriginal = (isOriginal: boolean) => {
    const updatedPhoto = { ...photosArray[0], isOriginal }; // Создаем новый объект с обновленным значением isOriginal
    const updatedPhotosArray = [...photosArray];
    updatedPhotosArray[0] = updatedPhoto; // Заменяем элемент в массиве
    setPhotosArray(updatedPhotosArray)
  }

  // aspectRatio
  const originalAspectRatio = photosArray[0].originalAspectRatio;
  const aspectRatio = photosArray[0].aspectRatio;

  const setAspectRatio = (aspectRatio: number) => {
    const updatedPhoto = { ...photosArray[0], aspectRatio }; // Создаем новый объект с обновленным значением aspectRatio
    const updatedPhotosArray = [...photosArray];
    updatedPhotosArray[0] = updatedPhoto; // Заменяем элемент в массиве
    setPhotosArray(updatedPhotosArray)
  }

  const handleAspectRatioClick = (value: number) => {
    if (value === 0) {
      setIsOriginal(true)
      setCroppedImage(null)
    } else {
      setIsOriginal(false)
      setAspectRatio(value)
    }
  }

  return (
    <CropContext.Provider
      value={{
        setPhotosArray,
        photosArray,
        originalAspectRatio,
        // setOriginalAspectRatio,
        crop,
        setCrop,
        aspectRatio,
        setAspectRatio,
        isOriginal,
        // setIsOriginal,
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
        selectedPhoto,
        setSelectedPhoto,
        setThumbsSwiper,
        thumbsSwiper,
        isSliderOpen,
        setIsSliderOpen,
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
