import React from "react";
import { Wizard } from 'react-use-wizard';
import {AddPhoto} from "@/features/create-post/steps/AddPhoto/AddPhoto";
import {Cropping} from "@/features/create-post/steps/Cropping/Cropping";
import {Filters} from "@/features/create-post/steps/Filters/Filters";
import {Publication} from "@/features/create-post/steps/Publication/Publication";
import CropProvider
  from "@/features/create-post/context/CropProvider";


const CreatePost = () => {
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

export default CreatePost;
