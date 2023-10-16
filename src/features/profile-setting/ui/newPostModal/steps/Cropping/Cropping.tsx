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

  const cropContext = useImageCropContext()

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: cropContext.aspectRatio >= 1,
    [style.imageFullHeight]: cropContext.aspectRatio < 1,
  })

  return (
    <NewPostModal isOpen={isOpen} title={'Cropping'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.container}>
        {cropContext.photosArray.length && <Cropper
          image={cropContext.photosArray[0].url || undefined}
          crop={cropContext.crop}
          onCropChange={cropContext.setCrop}
          aspect={cropContext.isOriginal ? cropContext.originalAspectRatio : cropContext.aspectRatio}
          onZoomChange={cropContext.setZoom}
          zoom={cropContext.zoom}
          onCropComplete={cropContext.onCropComplete}
          // onInteractionEnd={() => setIsModalOpen(false)}
          objectFit={ cropContext.photosArray[0].aspectRatio >= 1 ? "vertical-cover" : "cover"}
          classes={{
            cropAreaClassName: style.cropArea,
          }}
        />}
        <ButtonFilterPanel
          cropContext={cropContext}
        />
      </div>
    </NewPostModal>
  );
};
