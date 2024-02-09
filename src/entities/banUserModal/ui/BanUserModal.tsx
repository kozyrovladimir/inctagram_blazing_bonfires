import React from 'react'

import { useMutation } from '@apollo/client'
import NextImage from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

import s from './BanUserModal.module.scss'

import { User } from '@/__generated__/graphql'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { BAN_USER } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import { selectUserBlockReason } from '@/pages/super-admin/modal/selectors/admin-selectors'
import { setUsersBlockReason } from '@/pages/super-admin/modal/slices/admin-reducer'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { Button, ButtonSize, ButtonTheme, RadixSelect, Text } from '@/shared/ui'

type BanUserModalType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  user: User | null
}

export const BanUserModal = ({ isOpen, setIsOpen, user }: BanUserModalType) => {
  const dispatch = useDispatch()
  const banReason = useSelector(selectUserBlockReason)
  const [banUser] = useMutation(BAN_USER)

  // const [unbanUser, { data: isUnbanned }] = useMutation(UNBAN_USER, {
  //   variables: {
  //     userId: user.id,
  //   },
  //   context: {
  //     headers: {
  //       Authorization: `Basic ${getAdminBasicCredentials()}`,
  //     },
  //   },
  // })

  const handleSetUsersBlockReason = (reasonToBan: string) => {
    dispatch(setUsersBlockReason(reasonToBan))
  }

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
  }

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
              placeholder={'Reason for ban'}
            />
          </div>
          <div className={s.btns}>
            <Button
              size={ButtonSize.MIDDLE}
              theme={ButtonTheme.CLEAR}
              className={s.button}
              onClick={() => setIsOpen(false)}
            >
              No
            </Button>
            <Button size={ButtonSize.MIDDLE} className={s.button} onClick={handleBanUser}>
              Yes
            </Button>
          </div>
        </div>
      </div>
    </NewPostModal>
  )
}

const banReasons = ['Bad behaviour', 'Advertising placement', 'Another reason']
