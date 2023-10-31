export type SubscriptionType = 'DAY' | 'WEEKLY' | 'MONTHLY'

export type PaymentType = 'STRIPE' | 'PAYPAL'

export type SubscriptionDataType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}
