import React, { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'

import { BlockStatus, GetUsersQuery, SortDirection } from '@/__generated__/graphql'
import { UsersListTable } from '@/entities/usersListTable/UsersListTableType'
import { GET_USERS_LIST } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { getAdminBasicCredentials } from '@/pages/super-admin/lib/utils/utils'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(10)
  const [sort, setSort] = useState<SortType>(null)

  const { data: usersTableData } = useQuery(GET_USERS_LIST, {
    variables: {
      pageSize: Number(itemsPerPage),
      pageNumber: currentPage,
      sortBy: sort?.key,
      sortDirection: sort?.direction as SortDirection,
      searchTerm: searchValue, // searches only by userName
      ...(blockStatus === 'blocked' ? { blockStatus: blockStatus } : {}),
    },
    context: {
      headers: {
        Authorization: `Basic ${getAdminBasicCredentials()}`,
      },
    },
  })

  if (!usersTableData) return null

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <UsersListTable users={usersTableData.getUsers.users} setSort={setSort} sort={sort} />
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={usersTableData.getUsers.pagination.pagesCount}
        totalCount={usersTableData.getUsers.pagination.totalCount}
        itemsPerPage={usersTableData.getUsers.pagination.pageSize}
        currentPage={currentPage}
        handleSetItemsPerPage={handleSetItemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}

const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
