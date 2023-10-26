import React, { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { useWizard } from 'react-use-wizard'

import notPhoto from '@/shared/assets/icons/avatarProfile/notPhoto.png'

import style from './Publication.module.scss'

import ImageFilter from '@/features/create-post/components/ImageFilter'
import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { DotsBar } from '@/features/create-post/ui/DotsBar/DotsBar'
import NewPostModal from '@/features/create-post/ui/NewPostModal/NewPostModal'
import { useSlider } from '@/features/create-post/utils/useSlider'
import { useGetProfileQuery } from '@/shared/api/profile.api'
import backIcon from '@/shared/assets/icons/arrow back/back.svg'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'

export const Publication = () => {
  const { isOpen, setIsOpen } = useImageCropContext()
  const [text, setText] = useState('')
  const { previousStep } = useWizard()
  const cropContext = useImageCropContext()
  const { currentIndex, prevSlide, nextSlide } = useSlider(cropContext.photos.length)
  // const { data, isError, error, isLoading } = useMeQuery()
  // const { data: profileData } = useGetProfileQuery(data.id)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <NewPostModal
      isOpen={isOpen}
      title={'Publication'}
      setIsOpen={setIsOpen}
      left={<Image src={backIcon} alt={''} onClick={previousStep} />}
      right={<span>Publish</span>}
    >
      <div className={style.publishModalContent}>
        <div className={style.sliderWrapper}>
          <ImageFilter
            className={style.sliderImage}
            image={cropContext.photos[currentIndex].croppedUrl}
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
        <div className={style.publish}>
          <div className={style.publishContent}>
            <div className={style.avatarWrapper}>
              <Image src={notPhoto} alt={'userPhoto'} className={style.avatar} />
              <div>UserName</div>
            </div>
            <div className={style.description}>
              <label className={style.label}>Add publication descriptions</label>
              <textarea
                rows={6}
                cols={60}
                value={text}
                maxLength={500}
                onChange={handleChange}
                style={{ backgroundColor: 'black', width: '100%' }}
              />
              <div className={style.maxLength}> {text.length}/500</div>
              <Input
                label={'Add location'}
                placeholder={''}
                type={InputType.LOCATION}
                style={{ marginBottom: '20px' }}
                classNameWrap={'myCustomLabel'}
              />
            </div>
          </div>
        </div>
      </div>
    </NewPostModal>
  )
}
