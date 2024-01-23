import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { BlockStatus, GetUsersQuery, SortDirection } from '@/__generated__/graphql'
import { UsersListTable } from '@/entities/usersListTable/UsersListTableType'
import { GET_USERS_LIST } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { Pagination } from '@/shared/ui'

export const UsersTableListWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(10)
  const [sortBy, setSortBy] = useState('createdAt')

  const username = 'admin@gmail.com'
  const password = 'admin'

  const base64Credentials = btoa(`${username}:${password}`)

  const { data: usersTableData } = useQuery(GET_USERS_LIST, {
    variables: {
      pageSize: Number(itemsPerPage),
      pageNumber: currentPage,
      sortBy: 'createdAt',
      sortDirection: 'desc' as SortDirection,
      // searchTerm: '',
      // blockStatus: 'blocked' as BlockStatus,
    },
    context: {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
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
      <UsersListTable users={usersTableData.getUsers.users} />
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
