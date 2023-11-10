import * as React from 'react'
import { useEffect, useState } from 'react'

import styles from './Payments.module.scss'

import { useGetSubscriptionsQuery } from '@/shared/api'
import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { formatDate } from '@/shared/libs/formatDates/formatDates'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { Modal } from '@/shared/ui/modal/Modal'
import { TablePagination } from '@/shared/ui/pagination/TablePagination'

export const Payments = () => {
  const { data: payments, isLoading, isError } = useGetSubscriptionsQuery()
  const [error, setError] = useState(false)
  const [allPayments, setAllPayment] = useState([])
  const [page, setPage] = useState(1) // number of page
  const [itemsCountForPage, setItemsCountForPage] = useState(10) // quantity of payments per page
  const [totalCount, setTotalCount] = useState(100) // all payments

  const lastPaymentIndex = page * itemsCountForPage
  const firstPaymentIndex = lastPaymentIndex - itemsCountForPage
  const currentPayments = allPayments.slice(firstPaymentIndex, lastPaymentIndex)

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
  console.log(isError)

  return (
    <>
      {isLoading && <LinearLoader />}
      {error && (
        <Modal title={'Error'} mainButton={' Back '} callBackCloseWindow={() => setError(false)}>
          <p>Loading failed, please try again</p>
        </Modal>
      )}
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th className={styles.item}>Date of Payment</th>
              <th className={styles.item}>End date of subscription</th>
              <th className={styles.item}>Price</th>
              <th className={styles.item}>Subscription Type</th>
              <th className={styles.item}>Payment Type</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {currentPayments &&
              currentPayments.map((item: SubscriptionDataType, index: number) => {
                return (
                  <tr key={index} className={styles.line}>
                    <td className={styles.item}>
                      {index + 1}, {formatDate(item.dateOfPayment, 'dd.mm.yyyy')}
                    </td>
                    <td className={styles.item}>
                      {formatDate(item.endDateOfSubscription, 'dd.mm.yyyy')}
                    </td>
                    <td className={styles.item}>{item.price}</td>
                    <td className={styles.item}>
                      {item.subscriptionType === 'DAY'
                        ? '1 day'
                        : item.subscriptionType === 'WEEKLY'
                        ? '7 days'
                        : item.subscriptionType === 'MONTHLY'
                        ? '1 month'
                        : ''}
                    </td>
                    <td className={styles.item}>
                      {item.paymentType === 'PAYPAL' ? 'PayPal' : 'Stripe'}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
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
