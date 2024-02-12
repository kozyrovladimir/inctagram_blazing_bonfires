import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'

import { UsersListTable } from '@/entities/usersListTableWithPagination/ui/usersListTable/UsersListTable'
import { GET_USERS_LIST } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
import {
  selectPageNumber,
  selectPageSize,
} from '@/pages/super-admin/modal/selectors/admin-selectors'
import { setPageNumber, setPageSize } from '@/pages/super-admin/modal/slices/admin-reducer'
import { BlockedStatusType } from '@/pages/super-admin/users-list'
import { Pagination } from '@/shared/ui'
import { SortType } from '@/shared/ui/_table/Table'

type UsersTableListWithPaginationType = {
  searchValue: string
  blockStatus: BlockedStatusType
}

export const UsersTableListWithPagination = ({
  searchValue,
  blockStatus,
}: UsersTableListWithPaginationType) => {
  const dispatch = useDispatch()
  const pageNumber = useSelector(selectPageNumber) // its currently selected page
  const itemsPerPage = useSelector(selectPageSize)
  const [sort, setSort] = useState<SortType | null>(null)

  const { data: usersTableData } = useQuery(GET_USERS_LIST, {
    variables: {
      pageSize: itemsPerPage,
      pageNumber: pageNumber,
      sortBy: sort?.key,
      sortDirection: sort?.direction,
      searchTerm: searchValue, // searches only by userName. This is handled with local state, not redux.
      // ...(blockStatus === 'blocked' ? { blockStatus: blockStatus } : {}),
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  if (!usersTableData) return null

  const handleSetItemsPerPage = (numOfItemsPerPage: number) => {
    dispatch(setPageNumber(1))
    dispatch(setPageSize(Number(numOfItemsPerPage)))
  }

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber))
  }
  const handleSort = (sort: SortType) => {
    setSort(sort)
  }

  return (
    <>
      <UsersListTable
        skeletonRowsNum={usersTableData.getUsers.pagination.pageSize}
        users={usersTableData.getUsers.users}
        handleSort={handleSort}
        sort={sort}
      />
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={usersTableData.getUsers.pagination.pagesCount}
        totalCount={usersTableData.getUsers.pagination.totalCount}
        itemsPerPage={usersTableData.getUsers.pagination.pageSize}
        currentPage={pageNumber}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}

const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
