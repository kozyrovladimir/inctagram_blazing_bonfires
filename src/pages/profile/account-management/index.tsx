import { Management } from '@/features/profile-setting/ui/Management/Management'
import { settingLayout } from '@/shared/layouts/ProfileLayout/SettingLayout'

function AccountManagement() {
  return <Management />
}

AccountManagement.getLayout = settingLayout
export default AccountManagement
