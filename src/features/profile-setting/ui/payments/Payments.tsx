import * as React from 'react'
import { useEffect, useState } from 'react'

import styles from './Payments.module.scss'

import { useGetSubscriptionsQuery } from '@/shared/api'
import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { Modal } from '@/shared/ui/modal/Modal'
import { TablePagination } from '@/shared/ui/pagination/TablePagination'
import { Table } from '@/shared/ui/table/Table'

export const Payments = () => {
  const { data: payments, isLoading, isError } = useGetSubscriptionsQuery()
  const [error, setError] = useState(false)
  const [allPayments, setAllPayment] = useState([])
  const [page, setPage] = useState(1) // number of page
  const [itemsCountForPage, setItemsCountForPage] = useState(10) // quantity of payments per page
  const [totalCount, setTotalCount] = useState(100) // all payments

  const lastPaymentIndex = page * itemsCountForPage
  const firstPaymentIndex = lastPaymentIndex - itemsCountForPage
  const currentPayments: SubscriptionDataType[] = allPayments.slice(
    firstPaymentIndex,
    lastPaymentIndex
  )

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setItemsCountForPage(newCount)
  }

  useEffect(() => {
    if (payments) {
      setError(isError)
      setTotalCount(payments.length)
      setAllPayment(payments)
    }
  }, [payments])

  return (
    <>
      {isLoading && <LinearLoader />}
      {error && (
        <Modal title={'Error'} mainButton={' Back '} callBackCloseWindow={() => setError(false)}>
          <p>Loading failed, please try again</p>
        </Modal>
      )}
      <div className={styles.wrapper} data-testid="table">
        {currentPayments && <Table items={currentPayments} />}
        <TablePagination
          page={page}
          itemsCountForPage={itemsCountForPage}
          totalCount={totalCount}
          onChange={onChangePagination}
        />
      </div>
    </>
  )
}
