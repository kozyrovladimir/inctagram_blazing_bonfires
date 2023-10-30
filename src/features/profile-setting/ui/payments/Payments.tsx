import * as React from 'react'
import { useEffect, useState } from 'react'

import styles from './Payments.module.scss'

import { useGetSubscriptionsQuery } from '@/shared/api/services/subscriptions/subscriptions.api'
import { TablePagination } from '@/widgets/pagination/ui/TablePagination'

export const Payments = () => {
  const [page, setPage] = useState(2)
  const [count, setCount] = useState(10)
  const [totalCount, setTotalCount] = useState(100)

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setCount(newCount)
  }

  const { data, isLoading, isError } = useGetSubscriptionsQuery()

  useEffect(() => {
    console.log(data)
  }, [])

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
          <tr className={styles.line}>
            {/*<td className={styles.item}>10.08.22</td>*/}
            {/*<td className={styles.item}>11.08.22</td>*/}
            {/*<td className={styles.item}>$10</td>*/}
            {/*<td className={styles.item}>1 day</td>*/}
            {/*<td className={styles.item}>Stripe</td>*/}
          </tr>
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
