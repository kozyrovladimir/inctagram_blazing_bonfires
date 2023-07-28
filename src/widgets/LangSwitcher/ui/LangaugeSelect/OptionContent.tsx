import { FC } from 'react'
import * as React from 'react'

import Image from 'next/image'

import { ShortLangType, FlagType, FullLangType } from './LanguageSelect'
import style from './LanguageSelect.module.scss'

type Props = {
  alt: ShortLangType
  flagImg: FlagType
  description: FullLangType
}
export const OptionContent: FC<Props> = ({ alt, description, flagImg }) => {
  return (
    <div className={style.optionContent}>
      <Image src={flagImg} alt={alt} width={20} />
      <span className={style.description}>{description}</span>
    </div>
  )
}
