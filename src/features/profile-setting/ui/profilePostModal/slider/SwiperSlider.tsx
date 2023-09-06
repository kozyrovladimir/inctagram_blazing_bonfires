import React, { useState } from 'react'

import { FreeMode, Keyboard, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import 'swiper/scss/free-mode'
import 'swiper/scss/navigation'
import 'swiper/scss/thumbs'
import style from './Swiper.module.scss'

import { SliderItems } from '@/features/profile-setting/ui/profilePostModal/slider/SliderItems'

interface Photo {
  id: string
  url: string
}

export const SwiperSlider: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <div>
      <Swiper
        spaceBetween={10}
        navigation
        freeMode={true}
        thumbs={{ swiper: thumbsSwiper }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Thumbs, Keyboard, Pagination, FreeMode]}
        className={style.swiper1}
      >
        {photos.map(photo => (
          <SwiperSlide key={photo.id}>
            <img src={photo.url} alt={`Slide ${photo.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SliderItems photos={photos} setThumbsSwiper={setThumbsSwiper} setPhotos={setPhotos} />
    </div>
  )
}
