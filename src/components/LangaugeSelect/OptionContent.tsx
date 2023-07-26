import { FC } from 'react'
import * as React from 'react'

import Image from 'next/image'

import s from './LanguageSelet.module.scss'

type Props = {
  alt: string
  flagImg: string
  description: string
}
export const OptionContent: FC<Props> = ({ alt, description, flagImg }) => {
  return (
    <div className={s.optionContent}>
      <Image src={flagImg} alt={alt} width={20} />
      <span className={s.description}>{description}</span>
    </div>
  )
}
