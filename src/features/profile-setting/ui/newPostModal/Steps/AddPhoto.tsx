import React from "react";
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import {
  AddPostContext
} from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import closeIcon from '../../../../../shared/assets/icons/logout/close.svg';
import Image from "next/image";
import { useWizard } from "react-use-wizard";

export const AddPhoto = () => {
  const Context = React.useContext(AddPostContext);
  const {nextStep} = useWizard();
  // need to check if context is null
  if (!Context) return null;

  const {isOpen, setIsOpen} = Context;

  return (
    <NewPostModal isOpen={isOpen} title={'Add photo'} setIsOpen={setIsOpen} right={<Image src={closeIcon} alt={''} onClick={() => setIsOpen(false)} />}>
      <span>Add photo</span>
      <button onClick={nextStep}>next step</button>
    </NewPostModal>
  );
};
