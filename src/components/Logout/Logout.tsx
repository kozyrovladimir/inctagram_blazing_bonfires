import React, { useState } from 'react'

import Image from 'next/image'

import closeImg from '../../public/logout/close.svg'
import logoutImg from '../../public/logout/logout.svg'

import style from './Logout.module.scss'

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

export const Logout = () => {
  const [isLogout, setIsLogout] = useState(false)
  const logoutHandler = () => {
    setIsLogout(!isLogout)
  }

  return (
    <div className={style.logoutWrapper}>
      <button className={style.logoutButton} onClick={logoutHandler}>
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>Logout</span>
      </button>
      {isLogout && (
        <div className={style.logoutWindowWrapper}>
          <div className={style.logoutWindow}>
            <div className={style.logoutHeader}>
              <div>Log Out</div>
              <div>
                <button className={style.buttonClose} onClick={logoutHandler}>
                  <Image src={closeImg} alt={''} />
                </button>
              </div>
            </div>
            <div className={style.mainDescription}>
              Are you really want to log out of your account
              <span className={style.userName}> “Epam@epam.com”</span>?
            </div>
            <div className={style.buttons}>
              <div className={style.button}>
                <Button size={ButtonSize.SMALL} theme={ButtonTheme.CLEAR}>
                  Yes
                </Button>
              </div>
              <div onClick={logoutHandler}>
                <Button size={ButtonSize.SMALL}>No</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
