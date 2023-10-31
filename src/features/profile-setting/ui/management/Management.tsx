import * as React from 'react'
import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import styles from './Management.module.scss'

import {
  useCreateNewSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
} from '@/shared/api/services/subscriptions/subscriptions.api'
import {
  NewSubscriptionType,
  PaymentType,
  SubscriptionDataType,
  SubscriptionType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'
import payPal from '@/shared/assets/icons/payments/payPal.svg'
import stripe from '@/shared/assets/icons/payments/stripe.svg'
import { formatDate } from '@/shared/libs/formatDates/formatDates'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { Modal } from '@/shared/ui/modal/Modal'
import { RoundCheckbox } from '@/shared/ui/roundCheckbox/RoundCheckbox'

// create new subscription
const schema = yup.object({
  typeSubscription: yup.string<SubscriptionType>().required(),
  paymentType: yup.string<PaymentType>().required(),
  amount: yup.number().default(1).required(),
  baseUrl: yup.string().default('http://localhost:3000/').required(),
})

export const Management = () => {
  const router = useRouter()

  const [subscribed, setSubscribed] = useState(false)
  const callBackCloseWindow = () => setSubscribed(false)

  const [accType, setAccType] = useState('personal')

  const [error, setError] = useState(false)
  const callBackCloseErrorWindow = () => setError(false)

  const { data: currentSubscriptions, isLoading: currentSubscriptionLoading } =
    useGetCurrentSubscriptionsQuery()

  const [createNewSubscription, { isLoading }] = useCreateNewSubscriptionMutation()
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewSubscriptionType>({
    resolver: yupResolver(schema),
    defaultValues: { typeSubscription: 'DAY' },
    mode: 'onChange',
  })

  const handleStripePaymentType = () => {
    setValue('paymentType', 'STRIPE')

    return handleSubmit()
  }
  const handlePaypalPaymentType = () => {
    setValue('paymentType', 'PAYPAL')

    return handleSubmit()
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    createNewSubscription(data)
      .unwrap()
      .then(data => {
        router.replace(data.url)
      })
      .catch(error => {
        setError(error)
      })
  }

  const currentSubscriptionWrapper = styles.listWrapper + ' ' + styles.currentSubscriptionColumn

  return (
    <>
      {isLoading && <LinearLoader />}
      {currentSubscriptionLoading && <LinearLoader />}
      {error && (
        <Modal title={'Error'} mainButton={' Back '} callBackCloseWindow={callBackCloseErrorWindow}>
          <p>Transaction failed, please try again</p>
        </Modal>
      )}
      {subscribed && (
        <Modal title={'Success'} mainButton={' OK '} callBackCloseWindow={callBackCloseWindow}>
          <p>Payment was successful!</p>
        </Modal>
      )}
      <div className={styles.wrapper}>
        {currentSubscriptions && (
          <div key={currentSubscriptions.data.length - 1}>
            <h3 className={styles.title}>Current Subscription:</h3>
            <div className={currentSubscriptionWrapper}>
              <div className={styles.currentSubscriptionColumn}>
                <p className={styles.currentSubscriptionColumnName}>Expire at:</p>
                <p className={styles.currentSubscriptionColumnData}>
                  {formatDate(
                    currentSubscriptions.data[currentSubscriptions.data.length - 1]
                      .endDateOfSubscription,
                    'dd.mm.yyyy'
                  )}
                </p>
              </div>
              <div className={styles.currentSubscriptionColumn}>
                <p className={styles.currentSubscriptionColumnName}>Next payment:</p>
                <p className={styles.currentSubscriptionColumnData}>
                  {formatDate(
                    currentSubscriptions.data[currentSubscriptions.data.length - 1].dateOfPayment,
                    'dd.mm.yyyy'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.wrapper}>
        <div>
          <h3 className={styles.title}>Account type:</h3>
          <div className={styles.listWrapper}>
            <RoundCheckbox
              name={'accType'}
              onChange={() => setAccType('personal')}
              label={<p className={styles.listItem}>Personal</p>}
              checked={accType === 'personal'}
            />
            <RoundCheckbox
              name={'accType'}
              onChange={() => setAccType('business')}
              label={<p className={styles.listItem}>Business</p>}
              checked={accType === 'business'}
            />
          </div>
        </div>
        {accType === 'business' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.title}>Your subscription costs:</h3>
            <div className={styles.listWrapper}>
              <Controller
                control={control}
                name="typeSubscription"
                render={({ field: { onChange, value } }) => (
                  <>
                    <RoundCheckbox
                      value={'DAY'}
                      label={<p className={styles.listItem}>$10 per 1 Day</p>}
                      onChange={onChange}
                      checked={value === 'DAY'}
                    />
                    <RoundCheckbox
                      value={'WEEKLY'}
                      label={<p className={styles.listItem}>$50 per 7 Days</p>}
                      onChange={onChange}
                      checked={value === 'WEEKLY'}
                    />
                    <RoundCheckbox
                      value={'MONTHLY'}
                      label={<p className={styles.listItem}>$100 per month</p>}
                      onChange={onChange}
                      checked={value === 'MONTHLY'}
                    />
                  </>
                )}
              />
            </div>
            <div className={styles.footerWrapper}>
              <div className={styles.footer}>
                <button className={styles.imgWrapper} onClick={handlePaypalPaymentType}>
                  <Image className={styles.img} src={payPal} alt="payPal icon" />
                </button>
                <p>or</p>
                <button className={styles.imgWrapper} onClick={handleStripePaymentType}>
                  <Image className={styles.img} src={stripe} alt="stripe icon" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
