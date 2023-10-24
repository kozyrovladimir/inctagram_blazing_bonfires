import React, { useEffect, useRef } from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import Image from "next/image";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import { useSlider } from "@/features/profile-setting/ui/newPostModal/utils/useSlider";
import style from './Filters.module.scss';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import next from "@/shared/assets/icons/filterPostPhoto/next.svg";
import prev from "@/shared/assets/icons/filterPostPhoto/prev.svg";
import { DotsBar } from "@/features/profile-setting/ui/newPostModal/ui/DotsBar/DotsBar";
import ImageFilter
  from "@/features/profile-setting/ui/newPostModal/components/ImageFilter";

export const Filters = () => {
  const {nextStep, previousStep} = useWizard();
  const cropContext = useImageCropContext();
  const {currentIndex, prevSlide, nextSlide} = useSlider(cropContext.photos.length);

  return (
    <NewPostModal isOpen={cropContext.isOpen} title={'Filters'} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.filtersModalContent}>
        <div className={style.sliderWrapper}>
          <ImageFilter
              className={style.sliderImage}
              image={cropContext.photos[currentIndex].croppedUrl}
              filter={ 'sepia' } // see docs beneath
              colorOne={ [40, 250, 250] }
              colorTwo={ [250, 150, 30] }
              onChange={ (filteredImg: string) => {
                cropContext.setFilteredUrl(filteredImg, currentIndex);
                } }
              preserveAspectRatio={'contain'}
          />
          <div className={style.sliderButtonsContainer}>
            <Button
              theme={ButtonTheme.CLEAR}
              className={style.sliderButton}
              onClick={prevSlide}
            >
              <Image src={prev} alt={""} />
            </Button>
            <Button
              theme={ButtonTheme.CLEAR}
              className={style.sliderButton}
              onClick={nextSlide}
            >
              <Image src={next} alt={""} />
            </Button>
          </div>
          <div className={style.sliderDotsBarWrapper}>
            <DotsBar
              activeIndex={currentIndex}
              count={cropContext.photos.length}
            />
          </div>
        </div>
        <div className={style.filters}>

        </div>
      </div>
    </NewPostModal>
  );
};
