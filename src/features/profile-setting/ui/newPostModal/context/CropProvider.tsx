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
  croppedUrl: string;
};

const initialState: PhotoType[] = [
  {
    url: '',
    croppedUrl: '',
    width: 0,
    height: 0,
  },
]

export type CropContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  photos: PhotoType[];
  setPhotoList: (files: FileList) => void;
  setCroppedUrl: (croppedUrl: string, index: number) => void;
  originalAspect: number;
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
          let width = 0;
          let height = 0;

          image.onload = () => {
            width = image.width;
            height = image.height;
          }

          // TODO: убрать setTimeout
          // без него не успевает прогрузиться изображение
          setTimeout(() => {
          }, 20)

          return {
            url: url,
            width: image.width,
            height: image.height,
            croppedUrl: '',
          }
        })
        setPhotos(photos)
      }
    )
  }

  // оригинальное соотношение сторон
  const originalAspect = photos[0].width / photos[0].height

  const setCroppedUrl = (croppedUrl: string, index: number) => {
    const newPhotos = [...photos]
    newPhotos[index].croppedUrl = croppedUrl
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
