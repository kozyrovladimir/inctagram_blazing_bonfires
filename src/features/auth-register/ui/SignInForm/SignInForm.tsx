import { useState } from 'react'

import Image from 'next/image'

import styles from './SignInForm.module.scss'

import githubIcon from '@/public/socialIcons/github-icon.svg'
import googleIcon from '@/public/socialIcons/google-icon.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'

function Sign() {
  const [userName, setUserNAme] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className={styles.formContainer}>
      <div className={styles.socialIconContainer}>
        <Image src={googleIcon} alt="google icon" />
        <Image src={githubIcon} alt="github icon" />
      </div>
      <Input
        type={InputType.TEXT}
        label="Username"
        placeholder="Enter name"
        callback={curr => setUserNAme(curr)}
        value={userName}
      />
      <Input
        label="Email"
        type={InputType.EMAIL}
        placeholder="Enter email"
        callback={curr => setEmail(curr)}
        value={email}
      />
      <Input
        label="Password"
        type={InputType.PASSWORD}
        placeholder="Enter password"
        callback={curr => setPassword(curr)}
        value={password}
      />
      <p className={styles.signInForgotText}>Forgot Password</p>
      <Button size={ButtonSize.STRETCHED}>Sign In</Button>
      <p className={styles.helpText}>Don’t have an account?</p>
      <Button theme={ButtonTheme.CLEAR} size={ButtonSize.SMALL} className={styles.oppositeBtn}>
        Sign Up
      </Button>
    </form>
  )
}

export default Sign
