import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import enFlag from '../../../../shared/assets/icons/britishFlag.svg'
import ruFlag from '../../../../shared/assets/icons/russianFlag.svg'
import arrow from '../../../../shared/assets/icons/selectArrow.svg'

import style from './LanguageSelect.module.scss'
import { OptionContent } from './OptionContent'

export enum ShortLangs {
  RU = 'ru',
  EN = 'en',
}

export enum FullLangs {
  RU = 'Russian',
  EN = 'English',
}

export enum Flags {
  RU = ruFlag,
  EN = enFlag,
}

type LangOptionType = {
  shortLang: ShortLangs
  fullLang: FullLangs
  flag: Flags
}

const langOptions: LangOptionType[] = [
  { shortLang: ShortLangs.EN, fullLang: FullLangs.EN, flag: Flags.EN },
  { shortLang: ShortLangs.RU, fullLang: FullLangs.RU, flag: Flags.RU },
]

export const LanguageSelect = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router

  const refSelect = useRef<HTMLDivElement | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [activeSelect, setActiveSelect] = useState<ShortLangs>(ShortLangs.EN)

  const openSelectHandler = () => setIsOpenSelect(!isOpenSelect)
  const changeLanguageHandler = (lang: ShortLangs) => {
    setActiveSelect(lang)
    openSelectHandler()

    router.push({ pathname, query }, asPath, { locale: lang })
  }

  const closeOpenMenus = (e: DocumentEventMap['mousedown']) => {
    if (
      refSelect.current &&
      isOpenSelect &&
      !refSelect.current!.contains(e.target as HTMLDivElement)
    ) {
      setIsOpenSelect(false)
    }
  }

  const { shortLang, fullLang, flag } =
    langOptions.find(el => el.shortLang === activeSelect) || langOptions[0]

  useEffect(() => {
    if (isOpenSelect) {
      document.addEventListener('mousedown', closeOpenMenus)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
  }, [isOpenSelect])

  return (
    <div className={style.select} ref={refSelect}>
      <div className={style.selectContent} onClick={openSelectHandler}>
        <OptionContent alt={shortLang} flagImg={flag} description={fullLang} />
        <Image
          src={arrow}
          alt={''}
          className={style.arrowImg}
          style={{ transform: isOpenSelect ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </div>
      {isOpenSelect && (
        <div className={style.optionList}>
          {langOptions.map(el => (
            // eslint-disable-next-line react/jsx-key
            <div
              key={el.shortLang}
              className={style.option}
              onClick={() => changeLanguageHandler(el.shortLang)}
            >
              <OptionContent alt={el.shortLang} flagImg={el.flag} description={el.fullLang} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
