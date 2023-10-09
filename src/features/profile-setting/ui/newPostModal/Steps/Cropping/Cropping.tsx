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
import { ButtonFilterPanel } from "@/features/profile-setting";
import { classNames } from "@/shared/libs/classNames/classNames";

export const Cropping = () => {
  const {isOpen, setIsOpen} = useAddPostContext();
  const {nextStep, previousStep} = useWizard();

  const {
    croppedImage,
    onCropComplete,
    crop,
    setCrop,
    aspectRatio,
    isOriginal,
    zoom,
    setZoom,
    setIsModalOpen,
    image,
    originalAspectRatio,
    photosArray,
  } = useImageCropContext()

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: aspectRatio >= 1,
    [style.imageFullHeight]: aspectRatio < 1,
  })

  return (
    <NewPostModal isOpen={isOpen} title={'Cropping'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.container}>
        {photosArray.length && <Cropper
          image={photosArray[0].url || undefined}
          aspect={isOriginal ? originalAspectRatio : aspectRatio}
          crop={crop}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          zoom={zoom}
          onCropComplete={onCropComplete}
          onInteractionEnd={() => setIsModalOpen(false)}
          objectFit={isOriginal ? undefined : "contain"}
          showGrid={true}
          classes={{
            cropAreaClassName: style.cropArea,
          }}
        />}
        <ButtonFilterPanel />
      </div>
    </NewPostModal>
  );
};
