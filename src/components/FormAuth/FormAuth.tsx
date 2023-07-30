/* eslint-disable no-nested-ternary */
import { EventHandler, MouseEventHandler, useState } from 'react'

import Image from 'next/image'

import captchaIcon from '../../public/reCaptcha.svg'
import githubIcon from '../../public/socialIcons/github-icon.svg'
import googleIcon from '../../public/socialIcons/google-icon.svg'

import styles from './FormAuth.module.scss'

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'

interface IProps {
  formOption: FormOption
  callback?: (value: boolean) => void
}

export enum FormOption {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  CREATEPASSWORD = 'createPassword',
  FORGOTPASSWORD = 'forgotPassword',
}

function FormAuth({ formOption }: IProps) {
  const [userName, setUserNAme] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isSentPass, setIsSentPass] = useState(false)
  const [isNotRobot, setIsNotRobot] = useState(false)

  const sendLinkForgotPass = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsSentPass(true)
  }

  return (
    <form className={styles.formContainer}>
      <h3>
        {formOption === FormOption.SIGNUP && 'Sign Up'}
        {formOption === FormOption.SIGNIN && 'Sign In'}
        {formOption === FormOption.CREATEPASSWORD && 'Create Password'}
        {formOption === FormOption.FORGOTPASSWORD && 'Forgot Password'}
      </h3>
      {(formOption === FormOption.SIGNUP || formOption === FormOption.SIGNIN) && (
        <div className={styles.socialIconContainer}>
          <Image src={googleIcon} alt="google icon" />
          <Image src={githubIcon} alt="github icon" />
        </div>
      )}
      {formOption === FormOption.SIGNUP && (
        <Input
          label="Username"
          placeholder="Enter name"
          callback={curr => setUserNAme(curr)}
          value={userName}
          search={false}
        />
      )}
      {(formOption === FormOption.SIGNUP ||
        formOption === FormOption.SIGNIN ||
        formOption === FormOption.FORGOTPASSWORD) && (
        <Input
          label="Email"
          email={true}
          placeholder="Enter email"
          callback={curr => setEmail(curr)}
          value={email}
        />
      )}
      {(formOption === FormOption.SIGNUP || formOption === FormOption.SIGNIN) && (
        <Input
          label="Password"
          password={true}
          placeholder="Enter password"
          callback={curr => setPassword(curr)}
          value={password}
        />
      )}
      {formOption === FormOption.SIGNUP && (
        <Input
          label="Password confirmation"
          password={true}
          placeholder="Enter password"
          callback={curr => setPasswordConfirm(curr)}
          value={passwordConfirm}
        />
      )}
      {formOption === FormOption.SIGNIN && (
        <p className={styles.signInForgotText}>Forgot Password</p>
      )}
      {formOption === FormOption.FORGOTPASSWORD && (
        <>
          <p className={styles.forgotHelpText}>
            Enter your email address and we will send you further instructions
          </p>
          {isSentPass && (
            <p className={styles.forgotResendText}>
              The link has been sent by email. If you don’t receive an email send link again
            </p>
          )}
        </>
      )}
      {formOption === FormOption.SIGNIN && <Button size={ButtonSize.STRETCHED}>Sign In</Button>}
      {formOption === FormOption.SIGNUP && (
        <Button className={styles.signUpBtn} size={ButtonSize.STRETCHED}>
          Sign Up
        </Button>
      )}
      {formOption === FormOption.FORGOTPASSWORD && (
        <>
          {!isSentPass && (
            <Button size={ButtonSize.STRETCHED} onClick={sendLinkForgotPass}>
              Send Link
            </Button>
          )}
          {isSentPass && <Button size={ButtonSize.STRETCHED}>Send Again Again</Button>}
        </>
      )}
      {formOption === FormOption.CREATEPASSWORD && (
        <Button size={ButtonSize.STRETCHED}>Create new password</Button>
      )}

      {(formOption === FormOption.SIGNUP ||
        formOption === FormOption.SIGNIN ||
        formOption === FormOption.FORGOTPASSWORD) && (
        <>
          <p className={styles.helpText}>
            {formOption === FormOption.SIGNUP && 'Do you have an account?'}
            {formOption === FormOption.SIGNIN && 'Don’t have an account?'}
          </p>
          {formOption === FormOption.SIGNIN && (
            <Button
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.SMALL}
              className={styles.oppositeBtn}
            >
              Sign Up
            </Button>
          )}
          {formOption === FormOption.SIGNUP && (
            <Button
              className={styles.oppositeBtn}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.SMALL}
            >
              Sign In
            </Button>
          )}
          {formOption === FormOption.FORGOTPASSWORD && (
            <>
              <Button
                className={styles.oppositeBtn}
                theme={ButtonTheme.CLEAR}
                size={ButtonSize.MIDDLE}
              >
                Back to Sign In
              </Button>
              {!isSentPass && (
                <div className={styles.capchaContainer}>
                  <label className={styles.one}>
                    <input
                      type="checkbox"
                      checked={isNotRobot}
                      onClick={() => setIsNotRobot(!isNotRobot)}
                    ></input>
                    I&apos;m not a robot
                  </label>
                  <div className={styles.capchaIcon}>
                    <Image src={captchaIcon} alt={'captchaIcon'}></Image>
                    <p>reCAPTCHA</p>
                    <span>Privacy - Terms</span>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </form>
  )
}

export default FormAuth
