import React from 'react'

import style from './ButtonFilterPanel.module.scss'

import AspectRatioPanel from '@/features/create-post/components/aspectRatioPanel/AspectRatioPanel'
import ZoomPanel from '@/features/create-post/components/zoomPanel/ZoomPanel'
import { CropContextType } from '@/features/create-post/context/CropProvider'
import { AddPhotoSlider } from '@/features/create-post/steps/addPhotoSlider/AddPhotoSlider'

type Props = {
  cropContext: CropContextType
  index: number,
  setCurrentIndex: (index: number) => void

}

export const ButtonFilterPanel = ({ cropContext, index, setCurrentIndex }: Props) => {
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
        <AddPhotoSlider setCurrentIndex={setCurrentIndex} cropContext={cropContext} />
      </div>
    </div>
  )
}
