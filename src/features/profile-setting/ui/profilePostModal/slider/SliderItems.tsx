import React, { ChangeEvent } from 'react'

import { FreeMode, Keyboard, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useImageCropContext } from '@/features/profile-setting/ui/profilePostModal/cropper/CropProvider'
import { readFile } from '@/features/profile-setting/ui/profilePostModal/cropper/GetCroppedImage'
import style from '@/features/profile-setting/ui/profilePostModal/slider/Swiper.module.scss'

interface Photo {
  id: string
  url: string
}

type Props = {
  photos: Photo[]
  setThumbsSwiper: (swiper: any) => void
  setPhotos: (photos: Photo[]) => void
}
export const SliderItems: React.FC<Props> = ({ photos, setThumbsSwiper, setPhotos }) => {
  const { setImage, setOriginalAspectRatio } = useImageCropContext()

  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const photoUrl = URL.createObjectURL(file)
      const newPhoto: Photo = {
        id: photos.length + '1',
        url: photoUrl,
      }

      setPhotos([...photos, newPhoto])
    }
  }
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files && files[0]

    if (file) {
      const image: HTMLImageElement = new Image()

      const imageDataUrl = await readFile(file)

      image.src = imageDataUrl

      image.onload = () => {
        const aspectRatio = image.width / image.height

        setOriginalAspectRatio(aspectRatio)
        setImage(imageDataUrl)
      }
    }
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const inputElement = document.getElementById('inputPhotoProfile')

    if (inputElement) {
      inputElement.click()
    }
  }

  return (
    <div>
      <Swiper
        onSwiper={swiper => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={10}
        freeMode={true}
        watchSlidesProgress
        modules={[Navigation, Thumbs, Keyboard, Pagination, FreeMode]}
        className={style.swiper2}
      >
        {photos.map(photo => (
          <SwiperSlide key={photo.id}>
            <img src={photo.url} alt={`Thumbnail ${photo.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <input
        id="inputPhotoProfile"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={selectedPhotoHandler}
      />
      <button onClick={openSelectHandler}>Добавить фотографию</button>
    </div>
  )
}
