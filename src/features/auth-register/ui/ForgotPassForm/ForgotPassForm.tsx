import { useState } from 'react'

import Image from 'next/image'

import styles from './ForgotPassForm.module.scss'

import captchaIcon from '@/shared/assets/icons/login/reCaptchaIcon.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'

function ForgotPass() {
  const [email, setEmail] = useState('')
  const [isSentPass, setIsSentPass] = useState(false)
  const [isNotRobot, setIsNotRobot] = useState(false)

  const sendLinkForgotPass = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsSentPass(true)
  }

  return (
    <form className={styles.formContainer}>
      <Input
        classNameWrap={styles.enterEmail}
        label="Email"
        type={InputType.EMAIL}
        placeholder="Enter email"
        callback={curr => setEmail(curr)}
        value={email}
      />
      <p className={styles.forgotHelpText}>
        Enter your email address and we will send you further instructions
      </p>
      {isSentPass && (
        <p className={styles.linkAgainText}>
          The link has been sent by email. If you don’t receive an email send link again
        </p>
      )}
      {!isSentPass && (
        <Button
          size={ButtonSize.STRETCHED}
          onClick={sendLinkForgotPass}
          className={styles.sendLinkBtn}
        >
          Send Link
        </Button>
      )}
      {isSentPass && (
        <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
          Send Again Again
        </Button>
      )}
      <Button className={styles.oppositeBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.MIDDLE}>
        Back to Sign In
      </Button>
      {!isSentPass && (
        <div className={styles.capchaContainer}>
          <label>
            <input
              type="checkbox"
              checked={isNotRobot}
              onChange={() => setIsNotRobot(!isNotRobot)}
            ></input>
            I&apos;m not a robot
          </label>
          <div className={styles.capchaIcon}>
            <Image src={captchaIcon} alt={'captchaIcon'}></Image>
            <p>reCaptchaIcon</p>
            <span>Privacy - Terms</span>
          </div>
        </div>
      )}
    </form>
  )
}

export default ForgotPass
