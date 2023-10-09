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
import { useSelector } from "react-redux";
import { RootState } from "@/app/providers/StoreProvider";
import {
  PhotoType
} from "@/features/profile-setting/ui/newPostModal/reducers/photos.slice";

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
    setIsModalOpen,
    image,
    originalAspectRatio,
    photosArray,
    setZoomCreator,
    setZoom
  } = useImageCropContext()

  const imageClasses = classNames(style.croppedImage, {
    [style.imageFullWidth]: aspectRatio >= 1,
    [style.imageFullHeight]: aspectRatio < 1,
  })

  const photos = useSelector<RootState, any>((state) => state.photos.photos)

  return (
    <NewPostModal isOpen={isOpen} title={'Cropping'} setIsOpen={setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.container}>
        {photos.length && <Cropper
          image={photos[0].url || undefined}
          crop={{x: 0, y: 0}}
          onCropChange={(location) => {}}
          // aspect={photos[0].isOriginal ? photos[0].originalAspectRatio : photos[0].aspectRatio}
          // crop={photos[0].crop}
          // onCropChange={setCrop}
          // onZoomChange={setZoom}
          // zoom={photos[0].zoom}
          // onCropComplete={onCropComplete}
          // onInteractionEnd={() => setIsModalOpen(false)}
          // objectFit={isOriginal ? undefined : "contain"}
          // showGrid={true}
          classes={{
            cropAreaClassName: style.cropArea,
          }}
        />}
        <ButtonFilterPanel />
      </div>
    </NewPostModal>
  );
};
