import React, { useState } from 'react'

import Image from 'next/image'

import logoutImg from '../../../../public/logout/logout.svg'
import { useLogoutMutation } from '../../../../shared/api/auth.api'
import { ModalWindow } from '../../../../shared/modalWindow/ModalWindow'
import { Button, ButtonSize, ButtonTheme } from '../../../../shared/ui/Button/Button'

import style from './Logout.module.scss'

export const Logout = () => {
  const [logout, { isLoading }] = useLogoutMutation()

  const logoutApiHandler = () => {
    logout()
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
        <ModalWindow
          title={'Log Out'}
          extraButton={'Yes'}
          mainButton={'No'}
          callBackCloseWindow={logoutHandler}
          callBackApi={logoutApiHandler}
        >
          Are you really want to log out of your account
          <span className={style.userName}> “Epam@epam.com”</span>?
        </ModalWindow>
      )}
    </>
  )
}
