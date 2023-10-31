import * as React from 'react'
import { useState } from 'react'

import styles from './Payments.module.scss'

import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { formatDate } from '@/shared/libs/formatDates/formatDates'
import { TablePagination } from '@/widgets/pagination/ui/TablePagination'

type PropsType = {
  payments: SubscriptionDataType[]
}

export const Payments: React.FC<PropsType> = ({ payments }) => {
  const [page, setPage] = useState(2)
  const [count, setCount] = useState(10)
  const [totalCount, setTotalCount] = useState(100)

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setCount(newCount)
  }

  console.log(payments)

  return (
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
          {payments.map(item => {
            return (
              <tr key={item.subscriptionId} className={styles.line}>
                <td className={styles.item}>{formatDate(item.dateOfPayment, 'dd.mm.yyyy')}</td>
                <td className={styles.item}>
                  {formatDate(item.endDateOfSubscription, 'dd.mm.yyyy')}
                </td>
                <td className={styles.item}>{item.price}</td>
                <td className={styles.item}>{item.subscriptionType}</td>
                <td className={styles.item}>{item.paymentType}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <TablePagination
        page={page}
        itemsCountForPage={count}
        totalCount={12}
        onChange={onChangePagination}
      />
    </div>
  )
}
