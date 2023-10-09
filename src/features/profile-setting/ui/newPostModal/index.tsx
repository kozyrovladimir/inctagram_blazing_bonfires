import React from "react";
import { Wizard } from 'react-use-wizard';
import AddPostContextProvider
  from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import {AddPhoto} from "@/features/profile-setting/ui/newPostModal/steps/AddPhoto/AddPhoto";
import {Cropping} from "@/features/profile-setting/ui/newPostModal/steps/Cropping/Cropping";
import {Filters} from "@/features/profile-setting/ui/newPostModal/steps/Filters";
import {Publication} from "@/features/profile-setting/ui/newPostModal/steps/Publication";
import CropProvider
  from "@/features/profile-setting/ui/newPostModal/context/CropProvider";


const Index = () => {
  return (
    <AddPostContextProvider>
      <CropProvider>
        <Wizard>
          <AddPhoto/>
          <Cropping/>
          <Filters/>
          <Publication/>
        </Wizard>
      </CropProvider>
    </AddPostContextProvider>
  );
};

export default Index;
