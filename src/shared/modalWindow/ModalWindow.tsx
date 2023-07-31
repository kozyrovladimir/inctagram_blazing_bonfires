import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import style from './ModalWindow.module.scss'

import closeImg from '@/public/logout/close.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

type Props = {
  title: string
  buttonFirst: string
  buttonSecond?: string
  callBackApi?: () => void
  callBackCloseWindow: () => void
  children: ReactNode
}

export const ModalWindow: FC<Props> = ({
  children,
  title,
  buttonFirst,
  buttonSecond,
  callBackCloseWindow,
  callBackApi,
}) => {
  const refModalWindow = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const closeOpenMenus = (e: DocumentEventMap['mousedown']) => {
    if (
      refModalWindow.current &&
      isOpen &&
      !refModalWindow.current!.contains(e.target as HTMLDivElement)
    ) {
      setIsOpen(false)
      callBackCloseWindow()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeOpenMenus)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
  }, [isOpen])

  return (
    <div className={style.logoutWindowWrapper}>
      <div className={style.logoutWindow} ref={refModalWindow}>
        <div className={style.logoutHeader}>
          <div>{title}</div>
          <div>
            <Button
              theme={ButtonTheme.CLEAR}
              className={style.buttonClose}
              onClick={callBackCloseWindow}
            >
              <Image src={closeImg} alt={''} />
            </Button>
          </div>
        </div>
        <div className={style.mainDescription}>{children}</div>
        <div className={style.buttons}>
          <div className={style.button}>
            {buttonSecond && (
              <Button size={ButtonSize.SMALL} theme={ButtonTheme.CLEAR} onClick={callBackApi}>
                {buttonSecond}
              </Button>
            )}
          </div>
          <Button size={ButtonSize.SMALL} onClick={callBackCloseWindow}>
            {buttonFirst}
          </Button>
        </div>
      </div>
    </div>
  )
}
