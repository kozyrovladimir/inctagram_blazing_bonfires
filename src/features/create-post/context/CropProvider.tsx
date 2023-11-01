import React, { createContext, ReactNode, useContext, useState } from 'react'

import NextImage from 'next/image'

import { CanvasFilters } from '@/features/create-post/constants/canvasFilters'
import { processImageFiles } from '@/features/create-post/utils/processImageFiles'
import create from '@/shared/assets/icons/sideBar/create.svg'

export type PhotoType = {
  url: string
  width: number
  height: number
  position: {
    x: number
    y: number
  }
  filter: number[]
  croppedUrl: string
  filteredUrl: string
  zoom: number
  originalAspect: number
  currentAspect: number
}

const initialState: PhotoType[] = [
  {
    url: '',
    croppedUrl: '',
    filteredUrl: '',
    width: 0,
    height: 0,
    position: {
      x: 0,
      y: 0,
    },
    filter: [],
    zoom: 1,
    originalAspect: 0,
    currentAspect: 0,
  },
]

export type CropContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  photos: PhotoType[]
  setPhotoList: (files: FileList) => void
  setCroppedUrl: (croppedUrl: string, index: number) => void
  setFilteredUrl: (filteredUrl: string, index: number) => void
  setZoom: (index: number) => (zoom: number) => void
  originalAspect: number
  handleAspectRatioClick: (index: number) => (aspectRatio: number) => void
  setPosition: (index: number) => (position: { x: number; y: number }) => void
  setFilter: (index: number) => (filter: number[]) => void
}

export const CropContext = createContext<CropContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

const CropProvider: React.FC<Props> = ({ children }) => {
  // состояние модалки (открыта/закрыта)
  const [isOpen, setIsOpen] = React.useState(false)

  // массив фотографий
  const [photos, setPhotos] = useState<PhotoType[]>(initialState)

  // обработка фотографий и запись в массив
  const setPhotoList = (files: FileList) => {
    processImageFiles(Array.from(files))
      .then(imageDataUrls => {
        const photosPromises = imageDataUrls.map(url => {
          return new Promise((resolve, reject) => {
            const image = new Image()

            image.src = url

            image.onload = () => {
              resolve({
                url,
                width: image.width,
                height: image.height,
                croppedUrl: url,
                filteredUrl: url,
                zoom: 1,
                originalAspect: image.width / image.height,
                currentAspect: image.width / image.height,
                position: {
                  x: 0,
                  y: 0,
                },
                filter: CanvasFilters.NONE,
              })
            }

            image.onerror = () => {
              reject(new Error('Failed to load image.'))
            }
          })
        })

        return Promise.all(photosPromises)
      })
      .then(photos => {
        setPhotos(photos as PhotoType[])
      })
      .catch(error => {
        // Обработка ошибки при загрузке изображения
        console.error('Error loading images:', error)
      })
  }

  // оригинальное соотношение сторон
  const originalAspect = photos[0].width / photos[0].height

  // запись в массив обрезанной фотографии
  const setCroppedUrl = (croppedUrl: string, index: number) => {
    const newPhotos = [...photos]

    newPhotos[index].croppedUrl = croppedUrl
    setPhotos(newPhotos)
  }

  // запись в массив отфильтрованной фотографии
  const setFilteredUrl = (filteredUrl: string, index: number) => {
    const newPhotos = [...photos]

    newPhotos[index].filteredUrl = filteredUrl
    setPhotos(newPhotos)
  }

  // zoom
  const generateSetZoomFunc = (index: number) => (zoom: number) => {
    const newPhotos = [...photos]

    newPhotos[index].zoom = zoom
    setPhotos(newPhotos)
  }

  // filter
  const generateSetFilterFunc = (index: number) => (filter: number[]) => {
    const newPhotos = [...photos]

    newPhotos[index].filter = filter
    setPhotos(newPhotos)
  }

  // aspect ratio
  const generateHandleAspectRatioFunc = (index: number) => (aspectRatio: number) => {
    const newPhotos = [...photos]

    newPhotos[index].currentAspect = aspectRatio
    setPhotos(newPhotos)
  }

  // position
  const generateSetPositionFunc = (index: number) => (position: { x: number; y: number }) => {
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
        setFilteredUrl,
        setZoom: generateSetZoomFunc,
        handleAspectRatioClick: generateHandleAspectRatioFunc,
        setPosition: generateSetPositionFunc,
        setFilter: generateSetFilterFunc,
      }}
    >
      <NextImage src={create} alt={''} onClick={() => setIsOpen(true)} />
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