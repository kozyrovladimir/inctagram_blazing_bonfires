import React, { ChangeEvent, useState } from "react";
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import {
  AddPostContext
} from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import closeIcon from '@/shared/assets/icons/logout/close.svg';
import mockupPhoto from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import Image from "next/image";
import styles from "./AddPhoto.module.scss"
import { Button } from "@/shared/ui/Button/Button";
import { useWizard } from "react-use-wizard";

export const AddPhoto = () => {
  const Context = React.useContext(AddPostContext);
  const {nextStep} = useWizard();
  // need to check if context is null
  if (!Context) return null;

  const {isOpen, setIsOpen} = Context;
  const [photoProfile, setPhotoProfile] = useState<null | Blob | MediaSource>(null)
  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setPhotoProfile(e.target?.files[0])
    }
  }
  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoProfile')?.click()
  }

  return (
    <NewPostModal isOpen={isOpen} title={'Add photo'} setIsOpen={setIsOpen} right={<Image src={closeIcon} alt={''} onClick={() => setIsOpen(false)} />}>
      <div className={styles.addPhotoContentContainer}>
        <div className={styles.darkBox}>
          <Image src={mockupPhoto} alt={'mockup photo'}/>
        </div>
        <div className={styles.buttonsContainer}>
          <input
            type={'file'}
            onChange={selectedPhotoHandler}
            id={'inputPhotoProfile'}
            className={styles.inputPhoto}
          />
          <Button onClick={openSelectHandler} className={styles.button}>
            Select from Computer
          </Button>
          <Button onClick={nextStep} className={styles.button}>
            Open Draft
          </Button>
        </div>
      </div>
    </NewPostModal>
  );
};
