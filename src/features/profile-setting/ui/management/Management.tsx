import * as React from 'react'
import { useState } from 'react'

import Image from 'next/image'

import styles from './Management.module.scss'

import payPal from '@/shared/assets/icons/payments/payPal.svg'
import stripe from '@/shared/assets/icons/payments/stripe.svg'
import { Modal } from '@/shared/ui/modal/Modal'
import { RoundCheckbox } from '@/shared/ui/roundCheckbox/RoundCheckbox'

type AccType = {
  id: number
  name: string
}
const accTypes: AccType[] = [
  { id: 0, name: 'personal' },
  { id: 1, name: 'business' },
]

type PriceType = {
  id: number
  value: string
}
const prices: PriceType[] = [
  { id: 0, value: '$10 per 1 Day' },
  { id: 1, value: '$50 per 7 Day' },
  { id: 2, value: '$100 per month' },
]

// helper function
function capitalizeFirstLetter(inputString) {
  if (inputString.length === 0) {
    return inputString
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}

export const Management = () => {
  const [subscribed, setSubscribed] = useState(false)
  const callBackCloseWindow = () => setSubscribed(false)

  const [accType, setAccType] = useState(0)
  const handleChangeAccType = (value: number) => setAccType(value)

  const [accPrice, setAccPrice] = useState(0)
  const handleAccPriceType = (value: number) => setAccPrice(value)

  const choosePaymentMethod = () => console.log('choose payment method')

  return (
    <>
      {/*{error &&*/}
      {/*  <Modal title={'Error'} mainButton={' Back '} callBackCloseWindow={callBackCloseWindow}>*/}
      {/*    <p>Transaction failed, please try again</p>*/}
      {/*  </Modal>*/}
      {/*}*/}
      {subscribed && (
        <Modal title={'Success'} mainButton={' OK '} callBackCloseWindow={callBackCloseWindow}>
          <p>Payment was successful!</p>
        </Modal>
      )}
      <div className={styles.wrapper}>
        <div>
          <h3 className={styles.title}>Account type:</h3>
          <div className={styles.listWrapper}>
            {accTypes.map(item => {
              return (
                <RoundCheckbox
                  id={item.id}
                  key={item.id}
                  name={'accType'}
                  onChangeCheckbox={() => handleChangeAccType(item.id)}
                  label={<p className={styles.listItem}>{capitalizeFirstLetter(item.name)}</p>}
                />
              )
            })}
          </div>
        </div>
        {accType === 1 && (
          <>
            <div>
              <h3 className={styles.title}>Your subscription costs:</h3>
              <div className={styles.listWrapper}>
                {prices.map(item => {
                  return (
                    <RoundCheckbox
                      id={item.id}
                      key={item.id}
                      name={'accPrice'}
                      onChangeCheckbox={() => handleAccPriceType(item.id)}
                      label={<p className={styles.listItem}>{item.value}</p>}
                    />
                  )
                })}
              </div>
            </div>
            <div className={styles.footerWrapper}>
              <div className={styles.footer}>
                <div onClick={choosePaymentMethod} className={styles.imgWrapper}>
                  <Image className={styles.img} src={payPal} alt="payPal icon" />
                </div>
                <p>or</p>
                <div onClick={choosePaymentMethod} className={styles.imgWrapper}>
                  <Image className={styles.img} src={stripe} alt="stripe icon" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
