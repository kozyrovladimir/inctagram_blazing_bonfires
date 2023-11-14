import * as React from 'react'
import { FC, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import style from './Select.module.scss'

import arrow from '@/shared/assets/icons/langSelect/selectArrow.svg'

type Props = {
  selectionOptions: string[]
  widthSelect: string
}

export const Select: FC<Props> = ({ selectionOptions, widthSelect }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [activeSelect, setActiveSelect] = useState(selectionOptions[0])
  const refSelect = useRef<HTMLDivElement | null>(null)

  const openSelectHandler = () => {
    setIsOpenSelect(!isOpenSelect)
  }

  const changeActiveSelectHandler = (selectItem: string) => {
    setActiveSelect(selectItem)
    setIsOpenSelect(false)
  }

  const closeOpenMenu = (e: DocumentEventMap['mousedown']) => {
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
      document.addEventListener('mousedown', closeOpenMenu)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenu)
    }
  }, [isOpenSelect])

  return (
    <div className={style.root} style={{ width: widthSelect }} ref={refSelect}>
      <div
        onClick={openSelectHandler}
        className={style.activeSelect}
        style={{ border: isOpenSelect ? '1px solid #FFF' : '', color: isOpenSelect ? '#FFF' : '' }}
      >
        {activeSelect}
        <Image
          src={arrow}
          alt={''}
          className={style.arrowImg}
          style={{ transform: isOpenSelect ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </div>
      {isOpenSelect && (
        <div className={style.selectOptionsBlock}>
          {selectionOptions
            .filter(s => s !== activeSelect)
            .map((s, i) => (
              <div
                key={i}
                className={style.selectItem}
                onClick={() => changeActiveSelectHandler(s)}
              >
                {s}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
