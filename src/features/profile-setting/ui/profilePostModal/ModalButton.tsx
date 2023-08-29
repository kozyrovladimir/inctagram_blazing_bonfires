import React, { FC } from 'react'

import style from './ModalButton.module.scss'

interface ModalButtonProps {
  onAspectRatioChange: (aspectRatio: number) => void
}

export const ModalButton: FC<ModalButtonProps> = ({ onAspectRatioChange }) => {
  const handleAspectRatioClick = (aspectRatio: number) => {
    onAspectRatioChange(aspectRatio)
  }

  return (
    <div className={style.actionBtns}>
      <div onClick={() => handleAspectRatioClick(0)}>Origin</div>
      <div onClick={() => handleAspectRatioClick(1)}>1:1</div>
      <div onClick={() => handleAspectRatioClick(4 / 5)}>4:5</div>
      <div onClick={() => handleAspectRatioClick(16 / 9)}>16:9</div>
    </div>
  )
}
