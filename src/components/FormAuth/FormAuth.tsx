/* eslint-disable no-nested-ternary */
import { useState } from 'react'

import Image from 'next/image'

import githubIcon from '../../public/socialIcons/github-icon.svg'
import googleIcon from '../../public/socialIcons/google-icon.svg'

import styles from './FormAuth.module.scss'

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'

interface IProps {
  formOption: FormOption
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
      {(formOption === FormOption.SIGNUP || formOption === FormOption.SIGNIN) && (
        <>
          <Input
            label="Email"
            email={true}
            placeholder="Enter email"
            callback={curr => setEmail(curr)}
            value={email}
          />
          <Input
            label="Password"
            password={true}
            placeholder="Enter password"
            callback={curr => setPassword(curr)}
            value={password}
          />
        </>
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
      {formOption === FormOption.SIGNIN && <p className={styles.forgotPassText}>Forgot Password</p>}
      <Button
        className={formOption === FormOption.SIGNUP ? styles.signUpBtn : ''}
        size={ButtonSize.STRETCHED}
      >
        {formOption === FormOption.SIGNIN && 'Sign In'}
        {formOption === FormOption.SIGNUP && 'Sign Up'}
        {formOption === FormOption.FORGOTPASSWORD && 'Send Link'}
        {formOption === FormOption.CREATEPASSWORD && 'Create new password'}
      </Button>
      {(formOption === FormOption.SIGNUP || formOption === FormOption.SIGNIN) && (
        <>
          <p className={styles.helpText}>
            {formOption === FormOption.SIGNUP && 'Do you have an account?'}
            {formOption === FormOption.SIGNIN && 'Don’t have an account?'}
          </p>
          <Button className={styles.oppositeBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.SMALL}>
            {formOption === FormOption.SIGNIN && 'Sign Up'}
            {formOption === FormOption.SIGNUP && 'Sign In'}
          </Button>
        </>
      )}
    </form>
  )
}

export default FormAuth
