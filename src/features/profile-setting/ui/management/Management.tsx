import * as React from 'react'
import { useState } from 'react'

import Image from 'next/image'

import styles from './Management.module.scss'

import payPal from '@/shared/assets/icons/payments/payPal.svg'
import stripe from '@/shared/assets/icons/payments/stripe.svg'
import { Modal } from '@/shared/ui/Modal/Modal'
import { RoundCheckbox } from '@/shared/ui/roundCheckbox/roundCheckbox'

export const Management = () => {
  const [personalChecked, setPersonalChecked] = useState(true)
  const [businessChecked, setBusinessChecked] = useState(false)

  const [tenPerOneDay, setTenPerOneDay] = useState(true)
  const [fiftyPerSevenDays, setFiftyPerSevenDays] = useState(false)
  const [oneHundredPerMonth, setOneHundredPerMonth] = useState(false)

  const [subscribed, setSubscribed] = useState(false)
  const callBackCloseWindow = () => setSubscribed(false)

  const handlePersonalChange = () => {
    setPersonalChecked(!personalChecked)
    setBusinessChecked(false)
  }

  const handleBusinessChange = () => {
    setBusinessChecked(!businessChecked)
    setPersonalChecked(false)
  }

  const handleTenPerOneDay = () => {
    setTenPerOneDay(true)
    setFiftyPerSevenDays(false)
    setOneHundredPerMonth(false)
  }

  const handleFiftyPerSevenDays = () => {
    setTenPerOneDay(false)
    setFiftyPerSevenDays(true)
    setOneHundredPerMonth(false)
  }

  const handleOneHundredPerMonth = () => {
    setTenPerOneDay(false)
    setFiftyPerSevenDays(false)
    setOneHundredPerMonth(true)
  }

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
            <RoundCheckbox
              checked={personalChecked}
              onChange={handlePersonalChange}
              label={<p className={styles.listItem}>Personal</p>}
            />
            <RoundCheckbox
              checked={businessChecked}
              onChange={handleBusinessChange}
              label={<p className={styles.listItem}>Business</p>}
            />
          </div>
        </div>
        {businessChecked && (
          <>
            <div>
              <h3 className={styles.title}>Your subscription costs:</h3>
              <div className={styles.listWrapper}>
                <RoundCheckbox
                  checked={tenPerOneDay}
                  onChange={handleTenPerOneDay}
                  label={<p className={styles.listItem}>$10 per 1 Day</p>}
                />
                <RoundCheckbox
                  checked={fiftyPerSevenDays}
                  onChange={handleFiftyPerSevenDays}
                  label={<p className={styles.listItem}>$50 per 7 Day</p>}
                />
                <RoundCheckbox
                  checked={oneHundredPerMonth}
                  onChange={handleOneHundredPerMonth}
                  label={<p className={styles.listItem}>$100 per month</p>}
                />
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
