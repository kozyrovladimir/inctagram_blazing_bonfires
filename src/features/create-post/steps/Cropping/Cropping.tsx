import React, { useRef } from "react";
import { useWizard } from 'react-use-wizard';
import NewPostModal from "@/features/create-post/ui/NewPostModal/NewPostModal";
import backIcon from '@/shared/assets/icons/arrow back/back.svg';
import Image from "next/image";
import { useImageCropContext } from "@/features/create-post/context/CropProvider";
import style from './Cropping.module.scss'
import { ButtonFilterPanel } from "@/features/create-post/components/ButtonFilterPanel/ButtonFilterPanel";
import AvatarEditor from 'react-avatar-editor';
import {
  calculateImageDimensions
} from "@/features/create-post/utils/calculateImageDimensions";
import { useSlider } from "./../../utils/useSlider";


export const Cropping: React.FC = () => {
  const cropContext = useImageCropContext()

  const {currentIndex, prevSlide, nextSlide} = useSlider(cropContext.photos.length);

  const index = currentIndex;

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

  const nextStepHandler = () => {
    handleSave();
    void nextStep();
  }

  // ширина и высота контейнера редактора в пикселях
  // значения такие же как в style.editorContainer
  const editorContainerWidth = 500;
  const editorContainerHeight = 500;

  const {width, height} = calculateImageDimensions(cropContext.photos[index].currentAspect, editorContainerWidth, editorContainerHeight);

  return (
    <NewPostModal isOpen={cropContext.isOpen} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={''} onClick={previousStep} />} title={'Cropping'} right={<span onClick={nextStepHandler}>Next</span>}>
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
    </NewPostModal>
  );
};
