import React, { ChangeEvent, useEffect } from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './UserBanModal.module.scss'

import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { useBanUserMutation } from '@/features/user-management/lib/handle-user-ban'
import {
  selectBanModalOpenStatus,
  selectSelectedUser,
  selectUserBlockReason,
  setBanModalOpenStatus,
  setUsersBlockReason,
} from '@/features/user-management/model/userManagementSlice'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { Button, ButtonTheme, Input, InputType, RadixSelect, Text } from '@/shared/ui'

export const UserBanModal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const user = useSelector(selectSelectedUser)
  const isOpen = useSelector(selectBanModalOpenStatus)
  const banningReason = useSelector(selectUserBlockReason)
  const handleBanUser = useBanUserMutation()

  const handleSetUsersBlockReason = (selectedReasonToBan: string) => {
    const anotherReasonIsSelected = banningReason.startsWith(t('Admin.AnotherReason'))

    if (anotherReasonIsSelected) {
      dispatch(setUsersBlockReason(selectedReasonToBan + ' ' + banningReason))
    } else {
      dispatch(setUsersBlockReason(selectedReasonToBan))
    }
  }

  const handleSetoOtherReasonToBan = (e: ChangeEvent<HTMLInputElement>) => {
    // add explanation for 'other reason' ban selection
    dispatch(setUsersBlockReason(t('Admin.AnotherReason') + ' ' + e.target.value))
  }

  useEffect(() => {
    if (!isOpen) {
      // Reset the ban reason when the modal is closed
      dispatch(setUsersBlockReason(t('NotSelected')))
    }
  }, [isOpen, dispatch])

  const banReasons = [
    t('Admin.BadBehaviour'),
    t('Admin.AdvertisingPlacement'),
    t('Admin.AnotherReason'),
  ]

  return (
    <NewPostModal
      isOpen={isOpen}
      setIsOpen={value => dispatch(setBanModalOpenStatus(value))}
      title={'Ban user'}
      right={
        <NextImage
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          alt={''}
          onClick={() => dispatch(setBanModalOpenStatus(false))}
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
          {banningReason.startsWith(t('Admin.AnotherReason')) && (
            <Input
              placeholder={t('Admin.AddReason')}
              type={InputType.TEXT}
              onChange={handleSetoOtherReasonToBan}
            />
          )}
          <div className={s.btns}>
            <Button
              theme={ButtonTheme.CLEAR}
              className={s.button}
              onClick={() => dispatch(setBanModalOpenStatus(false))}
            >
              {t('No')}
            </Button>
            <Button
              className={s.button}
              onClick={() => {
                handleBanUser(banningReason, user)
                dispatch(setBanModalOpenStatus(false))
              }}
            >
              {t('Yes')}
            </Button>
          </div>
        </div>
      </div>
    </NewPostModal>
  )
}
