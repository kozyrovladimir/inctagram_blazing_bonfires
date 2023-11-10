import * as React from 'react'
import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import styles from './Management.module.scss'

import {
  useCancelAutoRenewalMutation,
  useCreateNewSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
} from '@/shared/api/services/subscriptions/subscriptions.api'
import {
  CurrentSubscriptionType,
  NewSubscriptionType,
  PaymentType,
  SubscriptionDataType,
  SubscriptionType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'
import payPal from '@/shared/assets/icons/payments/payPal.svg'
import stripe from '@/shared/assets/icons/payments/stripe.svg'
import { formatDate } from '@/shared/libs/formatDates/formatDates'
import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
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
// auto-renewal
const autoRenewalSchema = yup.object({
  hasAutoRenewal: yup.boolean<CurrentSubscriptionType>().required(),
})

export const Management = () => {
  const router = useRouter()

  const { success } = router.query

  const [subscribed, setSubscribed] = useState(false)
  const callBackCloseWindow = () => setSubscribed(false)

  useEffect(() => {
    if (success === 'true') {
      setSubscribed(true)
    }
  }, [success])

  const [accType, setAccType] = useState('personal')

  const [error, setError] = useState(false)
  const callBackCloseErrorWindow = () => setError(false)

  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

  const { data: currentSubscriptions, isLoading: currentSubscriptionLoading } =
    useGetCurrentSubscriptionsQuery()

  const [createNewSubscription, { isLoading }] = useCreateNewSubscriptionMutation()
  const {
    handleSubmit: handleSubmitSubscriptions,
    setValue,
    control,
  } = useForm<NewSubscriptionType>({
    resolver: yupResolver(schema),
    defaultValues: { typeSubscription: 'DAY' },
    mode: 'onChange',
  })

  const handleStripePaymentType = () => {
    setValue('paymentType', 'STRIPE')

    return handleSubmitSubscriptions()
  }
  const handlePaypalPaymentType = () => {
    setValue('paymentType', 'PAYPAL')

    return handleSubmitSubscriptions()
  }

  const onSubmit: SubmitHandler<NewSubscriptionType> = async (data: NewSubscriptionType) => {
    createNewSubscription(data)
      .unwrap()
      .then(data => {
        router.replace(data.url)
      })
      .catch(error => {
        setError(error)
      })
  }

  const handleHasAutoRenewal = () => {
    cancelAutoRenewal()
      .unwrap()
      .then(() => {
        console.log('cancelled')
      })
      .catch(error => {
        setError(error)
      })
  }

  const [currentSubs, setCurrentSubs] = useState([])

  console.log('currentSubs - ', currentSubs)

  useEffect(() => {
    currentSubscriptions?.data?.length && setCurrentSubs(currentSubscriptions.data)
  }, [onSubmit, handleSubmitSubscriptions])

  const wrapper =
    styles.wrapper + ' ' + (currentSubscriptions?.data?.length === 0 ? styles.wrapperTop : '')

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
      {/*current subscription*/}
      {currentSubs.length! > 0 && (
        <div className={styles.wrapper} style={{ marginTop: '-30px' }}>
          <div>
            <h3 className={styles.title}>Current Subscription:</h3>
            <div className={styles.listWrapper}>
              <div className={styles.currentSubscriptionRow}>
                <p className={styles.currentSubscriptionColumnName}>Expire at:</p>
                <p className={styles.currentSubscriptionColumnName} style={{ marginLeft: '10px' }}>
                  Next payment:
                </p>
              </div>
              {currentSubscriptions.data.map((item: SubscriptionDataType, index) => {
                return (
                  <div key={index}>
                    <div className={styles.currentSubscriptionRow}>
                      <p>{index + 1}</p>
                      <p className={styles.currentSubscriptionColumnData}>
                        {formatDate(item.endDateOfSubscription, 'dd.mm.yyyy')}
                      </p>
                      <p className={styles.currentSubscriptionColumnData}>
                        {formatDate(item.dateOfPayment, 'dd.mm.yyyy')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            {/*auto-renewal*/}
            <div className={styles.autoRenewalWrapper}>
              <Checkbox
                label={'Auto-Renewal'}
                labelStyle={styles.autoRenewalLabelStyle}
                onChange={handleHasAutoRenewal}
              />
            </div>
          </div>
        </div>
      )}
      {/*business or personal acc*/}
      <div className={wrapper}>
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
        {/*due date*/}
        {accType === 'business' && (
          <form onSubmit={handleSubmitSubscriptions(onSubmit)}>
            <h3 className={styles.title}>Your subscription costs:</h3>
            <div className={styles.listWrapper}>
              <Controller
                control={control}
                name="typeSubscription"
                render={({ field: { onChange, value } }) => (
                  <>
                    <RoundCheckbox
                      key={'day'}
                      value={'DAY'}
                      label={<p className={styles.listItem}>$10 per 1 Day</p>}
                      onChange={onChange}
                      checked={value === 'DAY'}
                    />
                    <RoundCheckbox
                      key={'weekly'}
                      value={'WEEKLY'}
                      label={<p className={styles.listItem}>$50 per 7 Days</p>}
                      onChange={onChange}
                      checked={value === 'WEEKLY'}
                    />
                    <RoundCheckbox
                      key={'monthly'}
                      value={'MONTHLY'}
                      label={<p className={styles.listItem}>$100 per month</p>}
                      onChange={onChange}
                      checked={value === 'MONTHLY'}
                    />
                  </>
                )}
              />
            </div>
            {/*payment method*/}
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
