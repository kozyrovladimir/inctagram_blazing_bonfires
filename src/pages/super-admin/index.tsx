import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getAdminLayout } from '@/shared/layouts/adminLayout/AdminLayout'

const SuperAdminHome = () => {
  return <div>SuperAdmin home</div>
}

SuperAdminHome.getLayout = getAdminLayout
export default SuperAdminHome
