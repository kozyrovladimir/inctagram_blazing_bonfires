import React, { ChangeEvent, useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './BanUserModal.module.scss'

import { User } from '@/__generated__/graphql'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { BAN_USER } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { selectUserBlockReason } from '@/pages/super-admin/modal/selectors/admin-selectors'
import { setUsersBlockReason } from '@/pages/super-admin/modal/slices/admin-reducer'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { Button, ButtonTheme, Input, InputType, RadixSelect, Text } from '@/shared/ui'

type BanUserModalType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  user: User | null
}

export const BanUserModal = ({ isOpen, setIsOpen, user }: BanUserModalType) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const banReason = useSelector(selectUserBlockReason)
  const [banUser] = useMutation(BAN_USER)
  const [anotherReasonToBan, setAnotherReasonToBan] = useState('')

  const handleSetUsersBlockReason = (reasonToBan: string) => {
    const anotherResonIsSelected = banReason.startsWith(t('Admin.AnotherReason'))

    if (anotherResonIsSelected) {
      dispatch(setUsersBlockReason(reasonToBan + ' ' + anotherReasonToBan))
    } else {
      dispatch(setUsersBlockReason(reasonToBan))
    }
  }

  const handleSetAnotherReasonToBan = (e: ChangeEvent<HTMLInputElement>) => {
    setAnotherReasonToBan(e.target.value)
    dispatch(setUsersBlockReason(t('Admin.AnotherReason') + ' ' + anotherReasonToBan))
  }

  useEffect(() => {
    if (!isOpen) {
      // Reset the ban reason when the modal is closed
      dispatch(setUsersBlockReason(t('NotSelected')))
    }
  }, [isOpen, dispatch])

  const handleBanUser = () => {
    banUser({
      variables: {
        banReason,
        userId: user?.id || 0,
      },
      context: {
        headers: {
          Authorization: `Basic ${getAdminBasicCredentials()}`,
        },
      },
    })
    setIsOpen(false)
  }

  const banReasons = [
    t('Admin.BadBehaviour'),
    t('Admin.AdvertisingPlacement'),
    t('Admin.AnotherReason'),
  ]

  return (
    <NewPostModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={'Ban user'}
      right={
        <NextImage
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          alt={''}
          onClick={() => setIsOpen(false)}
        />
      }
    >
      <div className={s.modalContentWrapper}>
        <div className={s.textWrapper}>
          <Text className={s.text}>
            Are you sure you want to ban this user, <b>{user?.userName}</b> ?
          </Text>
        </div>

        <div className={s.btnsAndSelectContainer}>
          <div className={s.select}>
            <RadixSelect
              className={s.triggerBtn}
              onChangeOption={handleSetUsersBlockReason}
              options={banReasons}
              placeholder={t('Admin.ReasonForBan')}
            />
          </div>
          {banReason.startsWith(t('Admin.AnotherReason')) && (
            <Input
              placeholder={t('Admin.AddReason')}
              type={InputType.TEXT}
              onChange={handleSetAnotherReasonToBan}
            />
          )}
          <div className={s.btns}>
            <Button theme={ButtonTheme.CLEAR} className={s.button} onClick={() => setIsOpen(false)}>
              {t('No')}
            </Button>
            <Button className={s.button} onClick={handleBanUser}>
              {t('Yes')}
            </Button>
          </div>
        </div>
      </div>
    </NewPostModal>
  )
}
