import { Payments } from '@/features/profile-setting/ui/Payments/Payments'
import { settingLayout } from '@/shared/layouts/ProfileLayout/SettingLayout'

function MyPayments() {
  return <Payments />
}

MyPayments.getLayout = settingLayout
export default MyPayments
