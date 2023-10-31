import { Management } from '@/features/profile-setting/ui/management/Management'
import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

function AccountManagement() {
  return <Management />
}

AccountManagement.getLayout = settingLayout
export default AccountManagement
