import React from 'react'

import Image from 'next/image'

import style from './ButtonFilterPanel.module.scss'

import { CropContextType } from '@/features/create-post/context/CropProvider'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'
import AspectRatioPanel from '@/features/create-post/components/AspectRatioPanel/AspectRatioPanel'
import ZoomPanel from '@/features/create-post/components/ZoomPanel/ZoomPanel'

interface ButtonFilterPanelProps {
  cropContext: CropContextType
  index: number
}

export const ButtonFilterPanel: React.FC<ButtonFilterPanelProps> = ({ cropContext, index }) => {
  const handleAspectRatio = (aspectRatio: number) => {
    cropContext.handleAspectRatioClick(index)(aspectRatio)
  }

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(event.target.value)
    cropContext.setZoom(index)(zoom)
  }

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.leftPanel}>
        <div>
          <AspectRatioPanel
            originalAspect={cropContext.photos[index].originalAspect}
            handleAspectRatio={handleAspectRatio}
          />
        </div>
        <div>
          <ZoomPanel
            zoom={cropContext.photos[index].zoom}
            handleZoomChange={handleZoomChange}
            index={index}
          />
        </div>
      </div>
      <div className={style.rightButton}>
        <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
          <Image
            src={noImage}
            alt={''}
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          />
        </Button>
      </div>
    </div>
  )
}
