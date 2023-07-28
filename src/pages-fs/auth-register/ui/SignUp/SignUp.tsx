import React, { useState } from 'react'

import styles from './SIgnUp.module.scss'

import FormAuth, { FormOption } from '@/components/FormAuth/FormAuth'

export const SignUp = () => {
  // const [isInputForm, setIsInputForm] = useState(true)
  // const [isMergerAccount, setIsMergerAccount] = useState(true)
  // const [isEmailSent, setIsEmailSent] = useState(false)
  // const [isVerification, setIsVerification] = useState(false)
  // const [isResendVerification, setIsResendVerification] = useState(false)

  return (
    <div className={styles.signUpConatainer}>
      <FormAuth formOption={FormOption.SIGNUP} />
      {/* {isInputForm && <FormSignUP />}
      {isMergerAccount && <h2>MergerAccount</h2>}
      {isEmailSent && <h2>isEmailSent</h2>}
      {isVerification && <h2>isVerification</h2>}
      {isResendVerification && <h2>isResendVerification</h2>} */}
    </div>
  )
}
