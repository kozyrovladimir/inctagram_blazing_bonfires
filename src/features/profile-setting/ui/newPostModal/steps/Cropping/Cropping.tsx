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
import {
  calculateImageDimensions
} from "@/features/profile-setting/ui/newPostModal/utils/calculateImageDimensions";


export const Cropping = () => {
  const {nextStep, previousStep} = useWizard();
  const cropContext = useImageCropContext();

  // console.log('cropContext', cropContext);

  const editor = useRef(null);

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current;
      console.log('canvas' ,canvas);
      // Здесь вы можете сохранить изображение, например, отправив его на сервер
    }
  };

  // ширина и высота контейнера редактора в пикселях
  const editorContainerWidth = 500;
  const editorContainerHeight = 500;

  const {width, height} = calculateImageDimensions(cropContext.photos[0].width, cropContext.photos[0].height, editorContainerWidth, editorContainerHeight);

  return (
    <NewPostModal isOpen={cropContext.isOpen} title={'Cropping'} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.editorContainer}>
        <AvatarEditor
          className={style.imageFullWidth}
          ref={editor}
          width={width}
          height={height}
          border={0}
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
