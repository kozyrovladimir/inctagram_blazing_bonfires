import * as React from 'react'

import styles from './Table.module.scss'

import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { formatDate } from '@/shared/libs/formatDates/formatDates'

type Props = {
  items: Array<SubscriptionDataType>
}

export const Table: React.FC<Props> = ({ items }) => {
  return (
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
        {items.map((item: SubscriptionDataType, index: number) => (
          <tr key={index} className={styles.line}>
            <td className={styles.item}>
              {index + 1}, {formatDate(item.dateOfPayment, 'dd.mm.yyyy')}
            </td>
            <td className={styles.item}>{formatDate(item.endDateOfSubscription, 'dd.mm.yyyy')}</td>
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
            <td className={styles.item}>{item.paymentType === 'PAYPAL' ? 'PayPal' : 'Stripe'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
