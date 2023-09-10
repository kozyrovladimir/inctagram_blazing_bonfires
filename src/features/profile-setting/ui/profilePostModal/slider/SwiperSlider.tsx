import React, { useState } from 'react'

import { FreeMode, Keyboard, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import 'swiper/scss/free-mode'
import 'swiper/scss/navigation'
import 'swiper/scss/thumbs'
import 'swiper/scss/pagination'
import 'swiper/scss/keyboard'
import style from './Swiper.module.scss'

export type Photo = {
  url: string
}

type Props = {
  photos: Photo[]
  thumbsSwiper: any
}
export const SwiperSlider: React.FC<Props> = ({ thumbsSwiper, photos }) => {
  return (
    <div>
      <Swiper
        spaceBetween={300}
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
        {photos?.map((photo, index) => (
          <SwiperSlide key={index}>
            <img src={photo.url} alt={`Slide ${index}`} width={'494px'} height={'494px'} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
