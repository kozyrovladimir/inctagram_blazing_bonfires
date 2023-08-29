import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import style from './Logout.module.scss'

import { useLogoutMutation } from '@/shared/api'
import { useUpdateTokenMutation } from '@/shared/api/auth/auth.api'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { Button } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

export const Logout = () => {
  const router = useRouter()

  const [logout, { isLoading, isSuccess: isLoggedOut }] = useLogoutMutation()
  const [refresh, { isSuccess: isRefreshed }] = useUpdateTokenMutation()

  const logoutApiHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        router.push('/sign-in')
      })
      .finally(() => {
        closeModal()
      })
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button className={style.logoutButton} onClick={openModal}>
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>Logout</span>
      </Button>
      {isModalOpen && (
        <Modal
          title={'Log Out'}
          extraButton={'Yes'}
          mainButton={'No'}
          callBackCloseWindow={closeModal}
          extraButtonCB={logoutApiHandler}
        >
          Are you really want to log out of your account
          <span className={style.userName}> “Epam@epam.com”</span> ?
        </Modal>
      )}
    </>
  )
}
