import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './Logout.module.scss'

import { useLogoutMutation, useMeQuery } from '@/shared/api'
import logoutImg from '@/shared/assets/icons/logout/logout.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

interface ButtonProps {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
}

export const Logout = ({ className, theme, size }: ButtonProps) => {
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'Auth' })
  const router = useRouter()

  const [logout, { isLoading }] = useLogoutMutation()
  const { data: userData } = useMeQuery()

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

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <Button
        className={`${style.logoutButton} ${className}`}
        theme={theme}
        size={size}
        onClick={logoutApiHandler}
      >
        <Image src={logoutImg} alt={''} />
        <span className={style.description}>{t('LogOut')}</span>
      </Button>
      {isModalOpen && (
        <Modal
          title={t('LogOut')}
          extraButton={tRoot('Yes')}
          mainButton={tRoot('No')}
          callBackCloseWindow={closeModal}
          extraButtonCB={logoutApiHandler}
        >
          {t('LogOutOfYourAccount')}
          <span className={style.userName}>{userData && userData.email}</span> ?
        </Modal>
      )}
    </>
  )
}
