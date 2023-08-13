import React, { useState } from 'react'

import Image from 'next/image'

import logoutImg from '../../../../../public/assets/icons/logout/logout.svg'

import style from './Logout.module.scss'

import { useLogoutMutation } from '@/shared/api/auth.api'
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
      <Button className={style.logoutButton} onClick={logoutHandler}>
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>Logout</span>
      </Button>
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
