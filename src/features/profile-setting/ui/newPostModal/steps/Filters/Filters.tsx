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
          <button onClick={prevSlide}>prev</button>
          <button onClick={nextSlide}>next</button>
        </div>
      </div>
    </NewPostModal>
  );
};
