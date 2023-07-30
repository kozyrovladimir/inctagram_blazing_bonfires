import styles from './CreateNewPassword.module.scss'

import CreateNewPass from '@/features/auth/ui/FormAuth/CreateNewPass/CreateNewPass'
import FormAuth from '@/features/auth/ui/FormAuth/FormAuth'

export const CreateNewPassword = () => {
  return (
    <div className={styles.createNewPassConatainer}>
      <FormAuth title="Create New Password">
        <CreateNewPass />
      </FormAuth>
    </div>
  )
}
