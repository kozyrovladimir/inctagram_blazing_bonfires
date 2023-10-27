import React from 'react'

import Image from 'next/image'
import { useWizard } from 'react-use-wizard'

import style from './Filters.module.scss'

import ImageFilter from '@/features/create-post/components/ImageFilter/ImageFilter'
import { CanvasFilters } from '@/features/create-post/constants/canvasFilters'
import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { DotsBar } from '@/features/create-post/ui/DotsBar/DotsBar'
import NewPostModal from '@/features/create-post/ui/NewPostModal/NewPostModal'
import { useSlider } from '@/features/create-post/utils/useSlider'
import backIcon from '@/shared/assets/icons/arrow back/back.svg'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const Filters = () => {
  const { nextStep, previousStep } = useWizard()
  const cropContext = useImageCropContext()
  const { currentIndex, prevSlide, nextSlide } = useSlider(cropContext.photos.length)
  const setFilter = cropContext.setFilter(currentIndex)

  return (
    <NewPostModal
      isOpen={cropContext.isOpen}
      title={'Filters'}
      setIsOpen={cropContext.setIsOpen}
      left={<Image src={backIcon} alt={''} onClick={previousStep} />}
      right={<span onClick={nextStep}>Next</span>}
    >
      <div className={style.filtersModalContent}>
        <div className={style.sliderWrapper}>
          <ImageFilter
            className={style.sliderImage}
            image={cropContext.photos[currentIndex].croppedUrl}
            // filter={ 'sepia' } // see docs beneath
            // colorOne={ [40, 250, 250] }
            // colorTwo={ [250, 150, 30] }
            filter={cropContext.photos[currentIndex].filter}
            onChange={(filteredImg: string) => {
              cropContext.setFilteredUrl(filteredImg, currentIndex)
            }}
            preserveAspectRatio={'contain'}
          />
          <div className={style.sliderButtonsContainer}>
            <Button theme={ButtonTheme.CLEAR} className={style.sliderButton} onClick={prevSlide}>
              <Image src={prev} alt={''} />
            </Button>
            <Button theme={ButtonTheme.CLEAR} className={style.sliderButton} onClick={nextSlide}>
              <Image src={next} alt={''} />
            </Button>
          </div>
          <div className={style.sliderDotsBarWrapper}>
            <DotsBar activeIndex={currentIndex} count={cropContext.photos.length} />
          </div>
        </div>
        <div className={style.filters}>
          <span style={{ textAlign: 'center' }}>choose filter: </span>
          <button onClick={() => setFilter(CanvasFilters.NONE)}>none</button>
          <button onClick={() => setFilter(CanvasFilters.WARM)}>warm</button>
          <button onClick={() => setFilter(CanvasFilters.COOL)}>cool</button>
          <button onClick={() => setFilter(CanvasFilters.SEPIA)}>sepia</button>
        </div>
      </div>
    </NewPostModal>
  )
}
