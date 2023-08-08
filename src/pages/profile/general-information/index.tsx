import { settingLayout } from '@/shared/layout/ProfileLayout/SettingLayout'
import { Input, InputType } from '@/shared/ui/Input/Input'

function GeneralInformation() {
  return <Input label={'User Name'} placeholder={'Enter'} type={InputType.TEXT} />
}

GeneralInformation.getLayout = settingLayout
export default GeneralInformation
