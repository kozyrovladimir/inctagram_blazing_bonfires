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
};

const initialState: PhotoType[] = [
  {
    url: '',
    width: 0,
    height: 0,
  },
]

export type CropContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  photos: PhotoType[];
  setPhotoList: (files: FileList) => void;
}

export const CropContext = createContext< CropContextType | undefined>(undefined)

type Props = {
  children: ReactNode,
}

const CropProvider: React.FC<Props> = ({ children }) => {
  // состояние модалки
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
          return {
            url: url,
            width: image.width,
            height: image.height,
          }
        })
        setPhotos(photos)
      }
    )
  }

  return (
    <CropContext.Provider
      value={{
        isOpen,
        setIsOpen,
        photos,
        setPhotoList,
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
