import React, { ChangeEvent, useState } from "react";
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import {
  AddPostContext
} from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import closeIcon from '@/shared/assets/icons/logout/close.svg';
import mockupPhoto from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import styles from "./AddPhoto.module.scss"
import { Button } from "@/shared/ui/Button/Button";
import { useWizard } from "react-use-wizard";
import NextImage from "next/image";
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import {
  readFile
} from "@/features/profile-setting/ui/profilePostModal/cropper/GetCroppedImage";

export const AddPhoto = () => {
  const Context = React.useContext(AddPostContext);
  const {nextStep} = useWizard();
  // need to check if context is null
  if (!Context) return null;

  const {isOpen, setIsOpen} = Context;

  const { setImage, setOriginalAspectRatio, photos, thumbsSwiper, setPhotos } =
    useImageCropContext()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files && files[0]

    if (file) {
      const image: HTMLImageElement = new Image()

      const imageDataUrl = await readFile(file)

      image.src = imageDataUrl

      console.log('imageDataUrl', imageDataUrl)

      image.onload = () => {
        const aspectRatio = image.width / image.height

        setOriginalAspectRatio(aspectRatio)
        setImage(imageDataUrl)
        setPhotos([{ url: imageDataUrl }, ...photos])
        nextStep()

      }
    }
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoPost')?.click()
  }

  const openDraftHandler = () => {}


  return (
    <NewPostModal isOpen={isOpen} title={'Add photo'} setIsOpen={setIsOpen} right={<NextImage src={closeIcon} alt={''} onClick={() => setIsOpen(false)} />}>
      <div className={styles.addPhotoContentContainer}>
        <div className={styles.darkBox}>
          <NextImage src={mockupPhoto} alt={'mockup photo'}/>
        </div>
        <div className={styles.buttonsContainer}>
          <input
            type={'file'}
            onChange={handleFileChange}
            id={'inputPhotoPost'}
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
