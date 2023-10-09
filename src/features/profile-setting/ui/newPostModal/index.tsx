import React from "react";
import { Wizard } from 'react-use-wizard';
import AddPostContextProvider
  from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import {AddPhoto} from "@/features/profile-setting/ui/newPostModal/Steps/AddPhoto/AddPhoto";
import {Cropping} from "@/features/profile-setting/ui/newPostModal/Steps/Cropping/Cropping";
import {Filters} from "@/features/profile-setting/ui/newPostModal/Steps/Filters";
import {Publication} from "@/features/profile-setting/ui/newPostModal/Steps/Publication";
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
