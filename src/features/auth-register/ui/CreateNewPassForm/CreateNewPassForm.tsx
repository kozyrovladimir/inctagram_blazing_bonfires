import { useState } from 'react'

import styles from './CreateNewPassForm.module.scss'

import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'

export function CreateNewPassForm() {
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordNew, setPasswordNew] = useState('')

  return (
    <form className={styles.formContainer}>
      <Input
        classNameWrap={styles.enterEmail}
        label="New Password"
        type={InputType.PASSWORD}
        placeholder="Enter password"
        callback={curr => setPasswordNew(curr)}
        value={passwordNew}
      />
      <Input
        label="Password confirmation"
        type={InputType.PASSWORD}
        placeholder="Enter password"
        callback={curr => setPasswordConfirm(curr)}
        value={passwordConfirm}
      />
      <p className={styles.createPassHelpText}>Your password must be between 6 and 20 characters</p>

      <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
        Create new password
      </Button>
    </form>
  )
}
