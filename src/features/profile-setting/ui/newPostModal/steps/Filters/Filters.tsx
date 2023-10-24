import React from "react";
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

export const Filters = () => {
  const {nextStep, previousStep} = useWizard();
  const cropContext = useImageCropContext();
  const {currentIndex, prevSlide, nextSlide} = useSlider(cropContext.photos.length);

  return (
    <NewPostModal isOpen={cropContext.isOpen} title={'Filters'} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <span>Filters</span>
      <div className={style.sliderWrapper}>
        <img className={style.sliderImage} src={cropContext.photos[currentIndex].croppedUrl} alt="slide" />
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
    </NewPostModal>
  );
};
