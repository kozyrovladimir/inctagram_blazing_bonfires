import styles from './ForgotPassword.module.scss'

import ForgotPassForm from '@/features/auth-register/ui/ForgotPassForm/ForgotPassForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

export const ForgotPassword = () => {
  return (
    <FormContainer title="Forgot Password" className={styles.forgotPassContainer}>
      <ForgotPassForm />
    </FormContainer>
  )
}
