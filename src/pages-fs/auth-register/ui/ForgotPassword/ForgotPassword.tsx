import styles from './ForgotPassword.module.scss'

import ForgotPass from '@/components/FormAuth/ForgotPass/ForgotPass'
import FormAuth from '@/components/FormAuth/FormAuth'

export const ForgotPassword = () => {
  return (
    <div className={styles.forgotPassConatainer}>
      <FormAuth title="Forgot Password">
        <ForgotPass />
      </FormAuth>
    </div>
  )
}
