import styles from './CreateNewPassword.module.scss'

import CreateNewPassForm from '@/features/auth/ui/CreateNewPassForm/CreateNewPassForm'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'

export const CreateNewPassword = () => {
  return (
    <FormContainer title="Create New Password" className={styles.createNewPassContainer}>
      <CreateNewPassForm />
    </FormContainer>
  )
}
