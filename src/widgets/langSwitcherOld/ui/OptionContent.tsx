import { FC } from 'react'
import * as React from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import style from './LanguageSelect.module.scss'

import { Flags, FullLangs, ShortLangs } from '@/shared/types/langSwitcherTypes'

type Props = {
  alt: ShortLangs
  flagImg: Flags
  description: FullLangs
}
export const OptionContent = ({ alt, description, flagImg }: Props) => {
  const flagSrc = flagImg as unknown as string | StaticImport

  return (
    <div className={style.optionContent}>
      <Image src={flagSrc} alt={alt} width={20} />
      <span className={style.description}>{description}</span>
    </div>
  )
}
