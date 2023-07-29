import { FC } from 'react'
import * as React from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { ShortLangs, Flags, FullLangs } from './LanguageSelect'
import style from './LanguageSelect.module.scss'

type Props = {
  alt: ShortLangs
  flagImg: Flags
  description: FullLangs
}
export const OptionContent: FC<Props> = ({ alt, description, flagImg }) => {
  const flagSrc = flagImg as unknown as string | StaticImport

  return (
    <div className={style.optionContent}>
      <Image src={flagSrc} alt={alt} width={20} />
      <span className={style.description}>{description}</span>
    </div>
  )
}
