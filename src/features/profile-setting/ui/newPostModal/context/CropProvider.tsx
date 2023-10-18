import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";
import {
  processImageFiles
} from "@/features/profile-setting/ui/newPostModal/utils/processImageFiles";

export type PhotoType = {
  url: string;
  width: number;
  height: number;
  position: {
    x: number;
    y: number;
  }
  croppedUrl: string;
  zoom: number;
  originalAspect: number;
  currentAspect: number;
};

const initialState: PhotoType[] = [
  {
    url: '',
    croppedUrl: '',
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0,
    },
    zoom: 1,
    originalAspect: 0,
    currentAspect: 0,
  },
]

export type CropContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  photos: PhotoType[];
  setPhotoList: (files: FileList) => void;
  setCroppedUrl: (croppedUrl: string, index: number) => void;
  setZoom: (index: number) => (zoom: number) => void;
  originalAspect: number;
  handleAspectRatioClick: (index: number) => (aspectRatio: number) => void;
  setPosition: (index: number) => (position: { x: number; y: number }) => void;
}

export const CropContext = createContext< CropContextType | undefined>(undefined)

type Props = {
  children: ReactNode,
}

const CropProvider: React.FC<Props> = ({ children }) => {
  // состояние модалки (открыта/закрыта)
  const [isOpen, setIsOpen] = React.useState(false);

  // массив фотографий
  const [photos, setPhotos] = useState<PhotoType[]>(initialState)

  // обработка фотографий и запись в массив
  const setPhotoList = (files: FileList) => {
    processImageFiles(Array.from(files)).then(
      (imageDataUrls) => {
        const photos = imageDataUrls.map((url) => {
          const image: HTMLImageElement = new Image();
          image.src = url;

          // TODO: убрать setTimeout
          // без него не успевает прогрузиться изображение
          setTimeout(() => {
          }, 100)

          return {
            url: url,
            width: image.width,
            height: image.height,
            croppedUrl: '',
            zoom: 1,
            originalAspect: image.width/ image.height,
            currentAspect: image.width/ image.height,
            position: {
              x: 0,
              y: 0,
            }
          }
        })
        setPhotos(photos)
      }
    )
  }

  // оригинальное соотношение сторон
  const originalAspect = photos[0].width / photos[0].height

  // запись в массив обрезанной фотографии
  const setCroppedUrl = (croppedUrl: string, index: number) => {
    const newPhotos = [...photos]
    newPhotos[index].croppedUrl = croppedUrl
    setPhotos(newPhotos)
  }

  // zoom
  const setZoom = (index: number) => (zoom: number) => {
    const newPhotos = [...photos]
    newPhotos[index].zoom = zoom
    setPhotos(newPhotos)
  }

  // aspect ratio
  const handleAspectRatioClick = (index: number) => (aspectRatio: number) => {
    const newPhotos = [...photos]
    newPhotos[index].currentAspect = aspectRatio
    setPhotos(newPhotos)
  }

  // position
  const setPosition = (index: number) => (position: { x: number; y: number }) => {
    const newPhotos = [...photos]
    newPhotos[index].position = position
    setPhotos(newPhotos)
  }

  return (
    <CropContext.Provider
      value={{
        isOpen,
        setIsOpen,
        photos,
        setPhotoList,
        originalAspect,
        setCroppedUrl,
        setZoom,
        handleAspectRatioClick,
        setPosition,
      }}
    >
      {/*temp button*/}
      <button onClick={() => setIsOpen(true)}>click</button>
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
