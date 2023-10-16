import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import Image from "next/image";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";

export const Publication = () => {
  const {isOpen, setIsOpen} = useImageCropContext();
  const {previousStep} = useWizard();

  return (
    <NewPostModal isOpen={isOpen} title={'Publication'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span>Publish</span>}>
      <span>Publication</span>
    </NewPostModal>
  );
};
