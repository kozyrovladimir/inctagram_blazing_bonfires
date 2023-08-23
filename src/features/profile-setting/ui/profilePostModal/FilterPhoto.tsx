import React, { FC } from 'react'

import Image from 'next/image'

import maxmMin from '../../../../shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import restangle from '../../../../shared/assets/icons/filterPostPhoto/restangle.svg'
import sizePhoto from '../../../../shared/assets/icons/filterPostPhoto/size.svg'
import noImage from '../../../../shared/assets/icons/image/no-image.svg'

import style from './FilterPhoto.module.scss'

import { FilterPhotoPanel } from '@/features/profile-setting/ui/profilePostModal/FilterPhotoPanel'

type Props = {
  photoPost: File | null
}

export const FilterPhoto: FC<Props> = ({ photoPost }) => {
  return (
    <div>
      {photoPost && (
        <div className={style.cyrcor}>
          <Image
            src={URL.createObjectURL(photoPost)}
            alt=""
            fill
            // width={492}
            // height={564}
            objectPosition={'center'}
            objectFit={'none'}
            // style={{
            //   zIndex: -1,
            //   backgroundPosition: 'center',
            //   backgroundRepeat: 'no-repeat',
            //   backgroundSize: 'cover',
            //   overflow: 'hidden',
            //   transform: 'none',
            //   backgroundImage: 'URL.createObjectURL(photoPost)',
            // }}
          />
          <div className={style.filterPanelContainer}>
            <div className={style.leftPanel}>
              <FilterPhotoPanel backgroundImage={restangle} overlayImage={sizePhoto} />
              <FilterPhotoPanel backgroundImage={restangle} overlayImage={maxmMin} />
            </div>
            <FilterPhotoPanel backgroundImage={restangle} overlayImage={noImage} />
          </div>
        </div>
      )}
    </div>
  )
}
