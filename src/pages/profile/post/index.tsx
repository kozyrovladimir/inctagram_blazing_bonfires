import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PostModal } from '@/features/post/ui/postModal/PostModal'
import { settingLayout } from '@/shared/layouts/profileLayout/SettingLayout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}
function Post() {
  return <PostModal />
}

Post.getLayout = settingLayout
export default Post
