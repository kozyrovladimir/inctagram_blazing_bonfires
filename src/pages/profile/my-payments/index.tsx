import { Payments } from '@/features/profile-setting/ui/Payments/Payments'
import { useGetSubscriptionsQuery } from '@/shared/api'
import { settingLayout } from '@/shared/layouts/ProfileLayout/SettingLayout'

function MyPayments() {
  const { data, isLoading, isError } = useGetSubscriptionsQuery()

  return <Payments payments={data} />
}

MyPayments.getLayout = settingLayout
export default MyPayments
