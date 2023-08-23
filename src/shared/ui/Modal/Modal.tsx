import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import backImg from '../../assets/icons/arrow back/back.svg'
import closeImg from '../../assets/icons/logout/close.svg'
import { Button, ButtonSize, ButtonTheme } from '../Button/Button'

import style from './Modal.module.scss'

type Props = {
  title: string
  mainButton?: string
  extraButton?: string
  styles?: {}
  isShowButton?: boolean
  mainButtonCB?: () => void
  extraButtonCB?: () => void
  callBackCloseWindow: () => void
  children: ReactNode
  headerClassName?: string
  showButtons?: boolean
}

export const Modal: FC<Props> = ({
  isShowButton = true,
  styles,
  children,
  title,
  mainButton,
  extraButton,
  callBackCloseWindow,
  extraButtonCB,
  mainButtonCB,
  headerClassName,
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
  const mainButtonHandler = () => {
    mainButtonCB && mainButtonCB()
    callBackCloseWindow()
  }
  const extraButtonHandler = () => {
    extraButtonCB && extraButtonCB()
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
      <div style={styles ? styles : {}} className={style.mainWindow} ref={refModalWindow}>
        {showButtons ? (
          <div className={style.header}>
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
          <div className={`${style.header} ${headerClassName}`}>
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
        <div className={style.mainDescription}>{children}</div>
        <div className={style.buttons}>
          <div className={style.button}>
            {extraButton && (
              <Button
                size={ButtonSize.SMALL}
                theme={ButtonTheme.CLEAR}
                onClick={extraButtonHandler}
              >
                {extraButton}
              </Button>
            )}
          </div>
          {isShowButton && (
            <Button size={ButtonSize.SMALL} onClick={mainButtonHandler}>
              {mainButton}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
