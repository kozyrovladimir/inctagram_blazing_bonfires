import React, { useEffect, useRef } from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import Image from "next/image";
import {
  CropContextType,
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import style from './Cropping.module.scss'
import { ButtonFilterPanel } from "@/features/profile-setting";
import AvatarEditor from 'react-avatar-editor';
import {
  calculateImageDimensions
} from "@/features/profile-setting/ui/newPostModal/utils/calculateImageDimensions";

interface CroppingProps {
  cropContext: CropContextType;
  index: number;
}


export const Cropping: React.FC<CroppingProps> = ({cropContext, index}) => {
  const {nextStep, previousStep} = useWizard();
  const positionChange = (position: { x: number; y: number; }) => {
    cropContext.setPosition(index)(position);
  }

  const editor = useRef(null);

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current as any;
      const croppedImage = canvas.getImageScaledToCanvas().toDataURL();
      cropContext.setCroppedUrl(croppedImage, index);
    }
  };

  // ширина и высота контейнера редактора в пикселях
  // значения такие же как в style.editorContainer
  const editorContainerWidth = 500;
  const editorContainerHeight = 500;

  const {width, height} = calculateImageDimensions(cropContext.photos[index].currentAspect, editorContainerWidth, editorContainerHeight);

  useEffect(() => {
    return () => {
      handleSave();
    }
  }
  , []);

  return (
    // <NewPostModal isOpen={cropContext.isOpen} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} title={'Cropping'} right={<span onClick={nextStep}>Next</span>}>
      <div className={style.editorContainer}>
        <AvatarEditor
          className={style.imageFullWidth}
          ref={editor}
          width={width}
          height={height}
          border={0}
          image={cropContext.photos[index].url} // Ссылка на изображение
          scale={cropContext.photos[index].zoom} // Масштаб
          position={cropContext.photos[index].position} // Позиция
          onPositionChange={positionChange}
        />
        <ButtonFilterPanel
          index={index}
          cropContext={cropContext}
        />
      </div>
    // </NewPostModal>
  );
};
