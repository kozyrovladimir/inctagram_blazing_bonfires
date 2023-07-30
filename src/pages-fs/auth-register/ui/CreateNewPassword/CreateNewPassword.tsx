import styles from './CreateNewPassword.module.scss'

import CreateNewPass from '@/components/FormAuth/CreateNewPass/CreateNewPass'
import FormAuth from '@/components/FormAuth/FormAuth'

export const CreateNewPassword = () => {
  return (
    <div className={styles.createNewPassConatainer}>
      <FormAuth title="Create New Password">
        <CreateNewPass />
      </FormAuth>
    </div>
  )
}
