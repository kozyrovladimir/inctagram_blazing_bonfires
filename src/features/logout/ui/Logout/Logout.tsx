import React, { useState } from 'react'

import Image from 'next/image'

import style from './Logout.module.scss'

import { useLogoutMutation } from '@/shared/api'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

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
      <button className={style.logoutButton} onClick={logoutHandler}>
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>Logout</span>
      </button>
      {isLogout && (
        <Modal
          title={'Log Out'}
          extraButton={'Yes'}
          mainButton={'No'}
          callBackCloseWindow={logoutHandler}
          extraButtonCB={logoutApiHandler}
        >
          Are you really want to log out of your account
          <span className={style.userName}> “Epam@epam.com”</span> ?
        </Modal>
      )}
    </>
  )
}
