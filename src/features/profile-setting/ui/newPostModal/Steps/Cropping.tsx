import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  AddPostContext
} from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import Image from "next/image";

export const Cropping = () => {
  const Context = React.useContext(AddPostContext);
  const {nextStep, previousStep} = useWizard();
  // need to check if context is null
  if (!Context) return null;

  const {isOpen, setIsOpen} = Context;

  return (
    <NewPostModal isOpen={isOpen} title={'Cropping'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <span>Cropping</span>
    </NewPostModal>
  );
};
