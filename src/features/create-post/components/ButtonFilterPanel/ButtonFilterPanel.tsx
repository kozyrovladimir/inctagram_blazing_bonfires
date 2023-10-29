import React from 'react'

import Image from 'next/image'

import style from './ButtonFilterPanel.module.scss'

import { CropContextType } from '@/features/create-post/context/CropProvider'
import maxmMin from '@/shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'
import AspectRatioPanel from '@/features/create-post/components/AspectRatioPanel/AspectRatioPanel'

interface ButtonFilterPanelProps {
  cropContext: CropContextType
  index: number
}

export const ButtonFilterPanel: React.FC<ButtonFilterPanelProps> = ({ cropContext, index }) => {
  const [zoomModalOpen, setZoomModalOpen] = React.useState(false)
  const toggleZoomModal = () => setZoomModalOpen(!zoomModalOpen)

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(event.target.value)
    cropContext.setZoom(index)(zoom)
  }

  const handleAspectRatioClick = cropContext.handleAspectRatioClick(index)

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.leftPanel}>
        <div className={style.buttonContainer}>
          <AspectRatioPanel
            originalAspect={cropContext.photos[index].originalAspect}
            onAspectRatioChange={handleAspectRatioClick}
          />
        </div>
        <div>
          {zoomModalOpen && (
            <div className={style.zoomInput}>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={cropContext.photos[index].zoom}
                onChange={handleZoomChange}
              />
            </div>
          )}
          <Button theme={ButtonTheme.CLEAR} className={style.sizeButton} onClick={toggleZoomModal}>
            <Image src={maxmMin} alt={''} />
          </Button>
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
