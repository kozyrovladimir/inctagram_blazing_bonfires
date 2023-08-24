import styles from './ProfileSetting.module.scss'

import { ProfilePhoto } from '@/features/profile-setting/ui/ProfilePhoto/ProfilePhoto'
import { Button } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { Calendar } from '@/widgets/Calendar'

export const ProfileSetting = () => {
  return (
    <form>
      <div className={styles.profileSettingContainer}>
        <div className={styles.photo}>
          <ProfilePhoto />
        </div>
        <div>
          <Input
            label={'Username'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
          />
          <Input
            label={'First Name'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
          />
          <Input
            label={'Last Name'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
          />
          <div className={styles.labelDate}>Date of birthday</div>
          <Calendar classNameWrap={styles.calendar} />
          <Input
            label={'City'}
            placeholder={''}
            type={InputType.TEXT}
            style={{ marginBottom: '20px' }}
            classNameWrap={'myCustomLabel'}
          />
          <div className={styles.aboutMeLabel}>About me</div>
          <textarea
            name="aboutMe"
            rows={4}
            cols={50}
            placeholder=" "
            className={styles.aboutMeTextarea}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.button}>Save Changes</Button>
      </div>
    </form>
  )
}
