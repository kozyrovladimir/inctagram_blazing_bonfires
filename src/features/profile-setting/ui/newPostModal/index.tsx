import React from "react";
import { Wizard } from 'react-use-wizard';
import AddPostContextProvider
  from "@/features/profile-setting/ui/newPostModal/context/AddPostContenx";
import {AddPhoto} from "@/features/profile-setting/ui/newPostModal/Steps/AddPhoto/AddPhoto";
import {Cropping} from "@/features/profile-setting/ui/newPostModal/Steps/Cropping";
import {Filters} from "@/features/profile-setting/ui/newPostModal/Steps/Filters";
import {Publication} from "@/features/profile-setting/ui/newPostModal/Steps/Publication";


const Index = () => {
  return (
    <AddPostContextProvider>
      <Wizard>
        <AddPhoto/>
        <Cropping/>
        <Filters/>
        <Publication/>
      </Wizard>
    </AddPostContextProvider>
  );
};

export default Index;
