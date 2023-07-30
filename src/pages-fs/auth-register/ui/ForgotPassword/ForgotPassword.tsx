import styles from './ForgotPassword.module.scss'

import ForgotPass from '@/features/auth/ui/FormAuth/ForgotPass/ForgotPass'
import FormAuth from '@/features/auth/ui/FormAuth/FormAuth'

export const ForgotPassword = () => {
  return (
    <div className={styles.forgotPassConatainer}>
      <FormAuth title="Forgot Password">
        <ForgotPass />
      </FormAuth>
    </div>
  )
}
