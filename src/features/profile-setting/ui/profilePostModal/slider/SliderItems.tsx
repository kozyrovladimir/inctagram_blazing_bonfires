import React, { ChangeEvent } from 'react'

import { FreeMode, Keyboard, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useImageCropContext } from '@/features/profile-setting/ui/profilePostModal/cropper/CropProvider'
import style from '@/features/profile-setting/ui/profilePostModal/slider/SliderItems.module.scss'
import { Photo } from '@/features/profile-setting/ui/profilePostModal/slider/SwiperSlider'
import 'swiper/scss'
import 'swiper/scss/free-mode'
import 'swiper/scss/navigation'
import 'swiper/scss/thumbs'
import 'swiper/scss/pagination'
import 'swiper/scss/keyboard'

type Props = {
  photos: Photo[]
  setThumbsSwiper: (swiper: any) => void
  setPhotos: (photos: Photo[]) => void
}
export const SliderItems: React.FC<Props> = ({ photos, setThumbsSwiper, setPhotos }) => {
  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const photoUrl = URL.createObjectURL(file)
      const newPhoto: Photo = {
        url: photoUrl,
      }

      setPhotos([...photos, newPhoto])
    }
  }

  const removePhotoFromList = (index: number) => {
    const newPhotoList = []

    for (let i = 0; i < photos.length; i++) {
      if (index === i) {
        console.log('')
      } else {
        newPhotoList?.push(photos[i])
      }
    }
    setPhotos(newPhotoList)
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const inputElement = document.getElementById('inputPhotoProfile')

    if (inputElement) {
      inputElement.click()
    }
  }

  return (
    <div className={style.sliderItems}>
      <Swiper
        onSwiper={swiper => setThumbsSwiper(swiper)}
        slidesPerView={10}
        freeMode={true}
        watchSlidesProgress
        modules={[Navigation, Thumbs, Keyboard, Pagination, FreeMode]}
        className={style.swiper2}
      >
        {photos?.map((photo, index) => (
          <SwiperSlide key={index}>
            <img
              src={photo.url}
              alt={`Thumbnail ${index}`}
              style={{
                width: '80px',
                height: '82px',
                padding: '10px',
              }}
            />
            <button onClick={() => removePhotoFromList(index)}>X</button>
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
