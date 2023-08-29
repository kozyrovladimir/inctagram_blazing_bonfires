import React, { FC, useState } from 'react'

import Image from 'next/image'

type Props = {
  backgroundImage: string
  overlayImage: string
  styles?: {}
  onClick?: () => void
  photoPost?: File | null
}
export const FilterPhotoPanel: FC<Props> = ({
  backgroundImage,
  overlayImage,
  styles,
  onClick,
  photoPost,
}) => {
  return (
    <>
      <div style={{ position: 'relative', padding: '10px', cursor: 'pointer' }}>
        <Image src={backgroundImage} alt="" onClick={onClick} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
          }}
        >
          <Image
            src={overlayImage}
            alt=""
            style={{ width: '24px', height: '24px' }}
            onClick={onClick}
          />
        </div>
      </div>
    </>
  )
}
