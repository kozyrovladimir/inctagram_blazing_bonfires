import React, { ChangeEvent, useState } from "react";
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import {
  AddPostContext, useAddPostContext
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
  processImageFiles
} from "@/features/profile-setting/ui/newPostModal/utils/processImageFiles";
import { useDispatch } from "react-redux";
import {
  setPhotos
} from "@/features/profile-setting/ui/newPostModal/reducers/photos.slice";

export const AddPhoto = () => {
  const dispatch = useDispatch();
  const {nextStep} = useWizard();
  const {isOpen, setIsOpen} = useAddPostContext();

  const { setPhotosArray} = useImageCropContext()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    processImageFiles(Array.from(files)).then(
      (imageDataUrls) => {
        const photos = imageDataUrls.map((url) => {
          const image: HTMLImageElement = new Image();
          image.src = url;
          const aspectRatio = image.width / image.height;
          return {
            url: url,
            crop: { x: 0, y: 0 },
            aspectRatio: aspectRatio,
            isOriginal: true,
            isImageCropped: false,
            croppedImage: null,
            zoom: 1,
            originalAspectRatio: aspectRatio,
            id: Math.random().toString(),
          }
        })
        dispatch(setPhotos({photos}))
        nextStep()
      }
    )
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoPost')?.click()
  }


  return (
    <NewPostModal isOpen={isOpen} title={'Add photo'} setIsOpen={setIsOpen} right={<NextImage src={closeIcon} alt={''} onClick={() => setIsOpen(false)} />}>
      <div className={styles.addPhotoContentContainer}>
        <div className={styles.darkBox}>
          <NextImage src={mockupPhoto} alt={'mockup photo'}/>
        </div>
        <div className={styles.buttonsContainer}>
          <input
            type={'file'}
            accept={'image/*'}
            multiple={true}
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
