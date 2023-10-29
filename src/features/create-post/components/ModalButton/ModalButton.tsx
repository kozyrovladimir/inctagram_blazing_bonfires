import React, { FC } from 'react'

import Image from 'next/image'

import image16 from '@/shared/assets/icons/filterPostPhoto/16_9.svg'
import image1 from '@/shared/assets/icons/filterPostPhoto/1_1.svg'
import image4 from '@/shared/assets/icons/filterPostPhoto/4_5.svg'
import originImage from '@/shared/assets/icons/filterPostPhoto/origin.svg'

import style from './ModalButton.module.scss'

interface ModalButtonProps {
  onAspectRatioChange: (aspectRatio: number) => void
  originalAspect: number
}

export const ModalButton: FC<ModalButtonProps> = ({ onAspectRatioChange,  originalAspect }) => {
  const handleAspectRatioClick = (aspectRatio: number) => {
    onAspectRatioChange(aspectRatio)
  }

  return (
    <div className={style.actionBtns}>
      <div onClick={() => handleAspectRatioClick(originalAspect)}>
        <Image src={originImage} alt={''} />
      </div>
      <div onClick={() => handleAspectRatioClick(1)}>
        <Image src={image1} alt={''} />
      </div>
      <div onClick={() => handleAspectRatioClick(4 / 5)}>
        <Image src={image4} alt={''} />
      </div>
      <div onClick={() => handleAspectRatioClick(16 / 9)}>
        <Image src={image16} alt={''} />
      </div>
    </div>
  )
}
