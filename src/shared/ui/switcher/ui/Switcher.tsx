import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import style from './LanguageSelect.module.scss'
import { OptionContent } from './OptionContent'

import arrow from '@/shared/assets/icons/langSelect/selectArrow.svg'
import { optionsType } from '@/shared/types/optionSwitcherTypes'

type Props = {
  options: optionsType[]
  initialValue: string
  changeHandlerExtraFn?: (argChangeHandler: string) => void
}

export const Switcher = ({ options, initialValue, changeHandlerExtraFn }: Props) => {
  const refSelect = useRef<HTMLDivElement | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [activeSelect, setActiveSelect] = useState(initialValue)

  const openSelectHandler = () => setIsOpenSelect(!isOpenSelect)

  const changeHandler = (option: string) => {
    setActiveSelect(option)
    openSelectHandler()
    changeHandlerExtraFn && changeHandlerExtraFn(option)
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

  const { shortDescription, description, icon } =
    options.find(el => el.shortDescription === activeSelect) || options[0]

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
      {!!activeSelect && (
        <div className={style.selectContent} onClick={openSelectHandler}>
          <OptionContent alt={shortDescription} icon={icon} description={description} />
          <Image
            src={arrow}
            alt={''}
            className={style.arrowImg}
            style={{ transform: isOpenSelect ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </div>
      )}
      {isOpenSelect && (
        <div className={style.optionList}>
          {options.map(el => (
            <div
              key={el.description}
              className={style.option}
              onClick={() => changeHandler(el.shortDescription)}
            >
              <OptionContent
                alt={el.shortDescription}
                icon={el.icon}
                description={el.description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
