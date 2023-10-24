import React from "react";
import { Wizard } from 'react-use-wizard';
import {AddPhoto} from "@/features/profile-setting/ui/newPostModal/steps/AddPhoto/AddPhoto";
import {Cropping} from "@/features/profile-setting/ui/newPostModal/steps/Cropping/Cropping";
import {Filters} from "@/features/profile-setting/ui/newPostModal/steps/Filters/Filters";
import {Publication} from "@/features/profile-setting/ui/newPostModal/steps/Publication/Publication";
import CropProvider
  from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import CropSlider
  from "@/features/profile-setting/ui/newPostModal/components/CropSlider/CropSlider";


const Index = () => {
  return (
      <CropProvider>
        <Wizard>
          <AddPhoto/>
          <Cropping/>
          <Filters/>
          <Publication/>
        </Wizard>
      </CropProvider>
  );
};

export default Index;
