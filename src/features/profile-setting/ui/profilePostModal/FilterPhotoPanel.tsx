import React, { FC } from 'react'

import Image from 'next/image'

type Props = {
  backgroundImage: string
  overlayImage: string
  styles?: {}
}
export const FilterPhotoPanel: FC<Props> = ({ backgroundImage, overlayImage, styles }) => {
  return (
    <div style={{ position: 'relative', padding: '10px', cursor: 'pointer' }}>
      <Image src={backgroundImage} alt="" />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
        }}
      >
        <Image src={overlayImage} alt="" style={{ width: '24px', height: '24px' }} />
      </div>
    </div>
  )
}
