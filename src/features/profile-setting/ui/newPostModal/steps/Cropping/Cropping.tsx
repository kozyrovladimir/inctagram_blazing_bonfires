import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  AddPostContext, useAddPostContext
} from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import Image from "next/image";
import Cropper from 'react-easy-crop';
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import style from './Cropping.module.scss'
import { classNames } from "@/shared/libs/classNames/classNames";
import { ButtonFilterPanel } from "@/features/profile-setting";


export const Cropping = () => {
  const {isOpen, setIsOpen} = useAddPostContext();
  const {nextStep, previousStep} = useWizard();

  const {
    croppedImage,
    onCropComplete,
    crop,
    setCrop,
    // aspectRatio,
    // isOriginal,
    setIsModalOpen,
    image,
    // originalAspectRatio,
    isOriginal,
    aspectRatio,
    originalAspectRatio,
    photosArray,
    setZoom,
    zoom
  } = useImageCropContext()

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: photosArray[0].aspectRatio >= 1,
    [style.imageFullHeight]: photosArray[0].aspectRatio < 1,
  })

  return (
    <NewPostModal isOpen={isOpen} title={'Cropping'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.container}>
        {photosArray.length && <Cropper
          image={photosArray[0].url || undefined}
          crop={crop}
          onCropChange={setCrop}
          aspect={isOriginal ? originalAspectRatio : aspectRatio}
          onZoomChange={setZoom}
          zoom={zoom}
          onCropComplete={onCropComplete}
          // onInteractionEnd={() => setIsModalOpen(false)}
          // objectFit={ photosArray[0].aspectRatio >= 1 ? "vertical-cover" : "cover"}
          classes={{
            cropAreaClassName: style.cropArea,
          }}
        />}
        <ButtonFilterPanel />
      </div>
    </NewPostModal>
  );
};
