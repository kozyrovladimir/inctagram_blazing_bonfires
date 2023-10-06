import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import {
  AddPostContext
} from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import Image from "next/image";
import backIcon from '../../../../../shared/assets/icons/arrow back/back.svg';

export const Publication = () => {
  const Context = React.useContext(AddPostContext);
  const {nextStep, previousStep} = useWizard();
  // need to check if context is null
  if (!Context) return null;

  const {isOpen, setIsOpen} = Context;

  return (
    <NewPostModal isOpen={isOpen} title={'Publication'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span>Publish</span>}>
      <span>Publication</span>
    </NewPostModal>
  );
};
