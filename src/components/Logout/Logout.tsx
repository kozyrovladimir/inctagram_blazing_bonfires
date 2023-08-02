import React, { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'

import closeImg from '../../public/logout/close.svg'
import logoutImg from '../../public/logout/logout.svg'
import { ModalWindow } from '../../shared/modalWindow/ModalWindow'
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
