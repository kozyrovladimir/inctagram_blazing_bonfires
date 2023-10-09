import React from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import {
  AddPostContext
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
  const Context = React.useContext(AddPostContext);
  const {nextStep, previousStep} = useWizard();
  // need to check if context is null
  if (!Context) return null;

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
  } = useImageCropContext()
  const {isOpen, setIsOpen} = Context;

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: aspectRatio >= 1,
    [style.imageFullHeight]: aspectRatio < 1,
  })

  return (
    <NewPostModal isOpen={isOpen} title={'Cropping'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.container}>
        {image && <Cropper
          image={image || undefined}
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
