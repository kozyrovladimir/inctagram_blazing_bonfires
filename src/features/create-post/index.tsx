import React from 'react'

import { Wizard } from 'react-use-wizard'

import CropProvider from '@/features/create-post/context/CropProvider'
import { AddPhoto } from '@/features/create-post/steps/addPhoto/AddPhoto'
import { Cropping } from '@/features/create-post/steps/cropping/Cropping'
import { Filters } from '@/features/create-post/steps/filters/Filters'
import { Publication } from '@/features/create-post/steps/publication/Publication'

const CreatePost = () => {
  return (
    <CropProvider>
      <Wizard>
        <AddPhoto />
        <Cropping />
        <Filters />
        <Publication />
      </Wizard>
    </CropProvider>
  )
}

export default CreatePost
