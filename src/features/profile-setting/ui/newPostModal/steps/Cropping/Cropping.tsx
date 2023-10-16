import React, { useRef } from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import Image from "next/image";
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import style from './Cropping.module.scss'
import { ButtonFilterPanel } from "@/features/profile-setting";
import AvatarEditor from 'react-avatar-editor';


export const Cropping = () => {
  const {nextStep, previousStep} = useWizard();
  const cropContext = useImageCropContext()

  const editor = useRef(null);

  return (
    <NewPostModal isOpen={cropContext.isOpen} title={'Cropping'} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.container}>
        <AvatarEditor
          ref={editor}
          width={200}
          height={150}
          border={0}
          color={[255, 255, 255, 0.6]} // Цвет границы
          image={cropContext.photos[0].url} // Ссылка на изображение
          scale={1} // Масштаб
        />

        <ButtonFilterPanel
          cropContext={cropContext}
        />
      </div>
    </NewPostModal>
  );
};
