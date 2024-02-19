import React, { useRef, useState } from 'react'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch, useSelector } from 'react-redux'

import s from './usersLists.module.scss'

import { UserBlockStatus } from '@/__generated__/graphql'
import { UsersTableListWithPagination } from '@/entities/usersListTableWithPagination/ui/UsersTableListWithPagination'
import {
  selectBlockStatus,
  setBlockStatus,
} from '@/features/user-management/model/userManagementSlice'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'
import { Input, InputType, RadixSelect } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const UsersList = () => {
  const dispatch = useDispatch()
  const blockStatus = useSelector(selectBlockStatus)

  const inputValue = useRef<HTMLInputElement | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = handleInputChange(setSearchValue, 500)

  const handleBlockStatusChange = (blockStatus: BlockedStatusType) => {
    dispatch(setBlockStatus(blockStatus))
  }
  const { t } = useTranslation('common', { keyPrefix: 'UserListTable' })
  const selectOptions = [t('NotBlocked'), t('Blocked')]

  return (
    <div className={s.usersListPage}>
      <div className={s.inputAndSelect}>
        <Input
          ref={inputValue}
          type={InputType.SEARCH}
          className={s.search}
          placeholder={t('Search')}
          onChange={handleSearch}
        />
        <div className={s.iconsContainer}>
          <RadixSelect
            className={s.triggerBtn}
            onChangeOption={handleBlockStatusChange}
            options={selectOptions}
            placeholder={t('NotSelected')}
          />
        </div>
      </div>
      <UsersTableListWithPagination searchValue={searchValue} blockStatus={blockStatus} />
    </div>
  )
}

export type BlockedStatusType = 'Blocked' | 'Not Blocked'

UsersList.getLayout = getAdminLayout
export default UsersList
