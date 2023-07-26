import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import enFlag from '../../public/languages/flagBritish.svg'
import rusFlag from '../../public/languages/flagRus.svg'
import arrowSvg from '../../public/select/arrowForSelect.svg'

import s from './LanguageSelet.module.scss'
import { OptionContent } from './OptionContent'

export const LanguageSelect = () => {
  const refSelect = useRef<HTMLDivElement | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [activeSelect, setActiveSelect] = useState<LanguagesType>('rus')

  const openSelectHandler = () => setIsOpenSelect(!isOpenSelect)
  const changeLanguageHandler = (lang: LanguagesType) => {
    setActiveSelect(lang)
    openSelectHandler()
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

  useEffect(() => {
    if (isOpenSelect) {
      document.addEventListener('mousedown', closeOpenMenus)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
  }, [isOpenSelect])

  return (
    <div>
      <div className={s.select} ref={refSelect}>
        <div className={s.selectContent} onClick={openSelectHandler}>
          {activeSelect === 'rus' && (
            <OptionContent alt={'Rus'} flagImg={rusFlag} description={'Russian'} />
          )}
          {activeSelect === 'en' && (
            <OptionContent alt={'En'} flagImg={enFlag} description={'English'} />
          )}
          <Image
            src={arrowSvg}
            alt={''}
            className={s.arrowImg}
            style={{ transform: isOpenSelect ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </div>
        {isOpenSelect && (
          <div className={s.optionList}>
            <div className={s.option} onClick={() => changeLanguageHandler('rus')}>
              <OptionContent alt={'Rus'} flagImg={rusFlag} description={'Russian'} />
            </div>
            <div className={s.option} onClick={() => changeLanguageHandler('en')}>
              <OptionContent alt={'En'} flagImg={enFlag} description={'English'} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

//type
type LanguagesType = 'rus' | 'en'
