import React from 'react'

import Image from 'next/image'

import style from './ButtonFilterPanel.module.scss'

import { ModalButton } from '@/features/profile-setting'
import {
  CropContextType,
  useImageCropContext
} from "@/features/profile-setting/ui/newPostModal/context/CropProvider";
import maxmMin from '@/shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import sizePhoto from '@/shared/assets/icons/filterPostPhoto/size.svg'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { useDispatch } from "react-redux";

interface ButtonFilterPanelProps {
  cropContext: CropContextType
}

export const ButtonFilterPanel: React.FC<ButtonFilterPanelProps> = ({cropContext}) => {

  if (!cropContext) return null

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.leftPanel}>
        <div className={style.buttonContainer}>
          {cropContext.isModalOpen && <ModalButton onAspectRatioChange={cropContext.handleAspectRatioClick} />}
          <Button theme={ButtonTheme.CLEAR} className={style.sizeButton} onClick={cropContext.handleCropOpen}>
            <Image src={sizePhoto} alt={''} />
          </Button>
        </div>
        <div>
          {cropContext.showZoomInput && (
            <div className={style.zoomInput}>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={cropContext.zoom}
                onChange={cropContext.handleZoomChange}
              />
            </div>
          )}
          <Button
            theme={ButtonTheme.CLEAR}
            className={style.sizeButton}
            onClick={cropContext.handleToggleZoomInput}
          >
            <Image src={maxmMin} alt={''} />
          </Button>
        </div>
      </div>
      <div className={style.rightButton}>
        <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}
                // onClick={cropContext.handlerShowSlider}
        >
          <Image
            src={noImage}
            alt={''}
            style={{ width: '24px', height: '24px', display: 'flex', flexDirection: 'column' }}
          />
        </Button>
      </div>
    </div>
  )
}
