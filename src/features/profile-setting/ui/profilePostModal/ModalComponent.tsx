import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import style from './ModalComponent.module.scss'

import backImg from '@/shared/assets/icons/arrow back/back.svg'
import closeImg from '@/shared/assets/icons/logout/close.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

type BoxCardModalPropsType = {
  title: string
  callBackCloseWindow: () => void
  reset?: () => void
  children: ReactNode
  showButtons?: boolean
}
export const ModalComponent: FC<BoxCardModalPropsType> = ({
  title,
  callBackCloseWindow,
  reset,
  children,
  showButtons,
}) => {
  const refModalWindow = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(true)
  const closeOpenMenu = (e: DocumentEventMap['mousedown']) => {
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
      document.addEventListener('mousedown', closeOpenMenu)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenu)
    }
  }, [isOpen])

  return (
    <div className={style.windowWrapper}>
      <div className={style.mainContainer} ref={refModalWindow}>
        <div className={style.contentBox}>
          {showButtons ? (
            <div className={style.title}>
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
          ) : (
            <div className={style.title}>
              <Image src={backImg} alt={''} style={{ cursor: 'pointer' }} />
              <div>{title}</div>
              <div>
                <div className={style.backButton}>
                  <Button
                    theme={ButtonTheme.CLEAR}
                    size={ButtonSize.SMALL}
                    className={style.buttonHeader}
                  >
                    {' '}
                    Next{' '}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={style.line}></div>
        <div className={style.form}> {children} </div>
      </div>
    </div>
  )
}
