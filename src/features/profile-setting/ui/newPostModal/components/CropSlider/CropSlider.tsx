import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import backIcon from "@/shared/assets/icons/arrow back/back.svg";
import NewPostModal from "@/features/profile-setting/ui/newPostModal/ui/NewPostModal/NewPostModal";
import { useWizard } from "react-use-wizard";
import {
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import {
  Cropping
} from "@/features/profile-setting/ui/newPostModal/steps/Cropping/Cropping";


const CropSlider = () => {
  const { nextStep, previousStep } = useWizard();
  const cropContext = useImageCropContext();

  return (
    <NewPostModal isOpen={cropContext.isOpen} setIsOpen={cropContext.setIsOpen} left={<Image src={backIcon} alt={""} onClick={previousStep} />} title={"Cropping"} right={<span onClick={nextStep}>Next</span>}>
      <div style={{width: '500px', height: '500px'}}>
        <CarouselProvider
          naturalSlideWidth={500}
          naturalSlideHeight={500}
          totalSlides={cropContext.photos.length}
          visibleSlides={1}
          infinite={false}
          touchEnabled={false}
          dragEnabled={false}
        >
          <Slider>
            {
              cropContext.photos.map((photo, index) => (
                <Slide index={index}>
                  <Cropping cropContext={cropContext} index={index}/>
                </Slide>
              ))
            }
          </Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </div>
    </NewPostModal>
  );
};

export default CropSlider;
