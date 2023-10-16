import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import Image from "next/image";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";

export const Filters = () => {
  const {nextStep, previousStep} = useWizard();
  const {isOpen, setIsOpen} = useImageCropContext();

  return (
    <NewPostModal isOpen={isOpen} title={'Filters'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <span>Filters</span>
    </NewPostModal>
  );
};
