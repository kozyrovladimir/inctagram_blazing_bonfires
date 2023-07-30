import React, { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'

import closeImg from '../../public/logout/close.svg'
import logoutImg from '../../public/logout/logout.svg'
import { Button, ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button'

import style from './Logout.module.scss'

export const Logout = () => {
  const mutation = useMutation({
    mutationFn: () => {
      return fetch('https://inctagram-api.vercel.app/api/auth/logout', {
        credentials: 'include',
        method: 'POST',
      })
    },
  })
  const logoutApiHandler = () => {
    mutation.mutate()
    logoutHandler()
  }

  const [isLogout, setIsLogout] = useState(false)
  const logoutHandler = () => {
    setIsLogout(!isLogout)
  }

  return (
    <>
      <Button className={style.logoutButton} onClick={logoutHandler}>
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>Logout</span>
      </Button>
      {isLogout && (
        <div className={style.logoutWindowWrapper}>
          <div className={style.logoutWindow}>
            <div className={style.logoutHeader}>
              <div>Log Out</div>
              <div>
                <Button
                  theme={ButtonTheme.CLEAR}
                  className={style.buttonClose}
                  onClick={logoutHandler}
                >
                  <Image src={closeImg} alt={''} />
                </Button>
              </div>
            </div>
            <div className={style.mainDescription}>
              Are you really want to log out of your account
              <span className={style.userName}> “Epam@epam.com”</span>?
            </div>
            <div className={style.buttons}>
              <div className={style.button}>
                <Button
                  size={ButtonSize.SMALL}
                  theme={ButtonTheme.CLEAR}
                  onClick={logoutApiHandler}
                >
                  Yes
                </Button>
              </div>
              <Button size={ButtonSize.SMALL} onClick={logoutHandler}>
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
