import React, { useState } from 'react'

import Cropper from 'react-easy-crop'

import style from './ZoomCrop.module.scss'

type Props = {
  image: string
}

export const ZoomCrop: React.FC<Props> = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(event.target.value))
  }

  return (
    <div className={style.mainContainer}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        restrictPosition={false}
        classes={{
          containerClassName: style.cropper,
          mediaClassName: style.cropperMedia,
          cropAreaClassName: style.cropArea,
        }}
        showGrid={false}
        cropShape={'rect'}
      />
      <div style={{ position: 'relative', top: '10px' }}>
        <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={handleZoomChange} />
      </div>
    </div>
  )
}
