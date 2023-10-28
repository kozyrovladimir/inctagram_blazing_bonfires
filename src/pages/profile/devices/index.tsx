import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Devices } from '@/features/profile-setting/devices/Devices'
import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function DevicesPage() {
  return <Devices />
}

DevicesPage.getLayout = settingLayout
export default DevicesPage
